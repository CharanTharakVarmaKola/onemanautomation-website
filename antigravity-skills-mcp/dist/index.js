#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const GITHUB_API_BASE = "https://api.github.com/repos/sickn33/antigravity-awesome-skills/contents/skills";
const server = new index_js_1.Server({
    name: "antigravity-skills-mcp",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
// Helper for GitHub API requests
async function fetchGitHubContent(path = "") {
    const url = path ? `${GITHUB_API_BASE}/${path}` : GITHUB_API_BASE;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                "User-Agent": "Antigravity-MCP-Server",
                "Accept": "application/vnd.github.v3+json",
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, `GitHub API error: ${error.response?.status} ${error.response?.statusText} - ${JSON.stringify(error.response?.data)}`);
        }
        throw error;
    }
}
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "list_available_skills",
                description: "List all available skills in the Antigravity Awesome Skills repository",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "get_skill_content",
                description: "Get the content of a specific skill file, typically SKILL.md",
                inputSchema: {
                    type: "object",
                    properties: {
                        skill_name: {
                            type: "string",
                            description: "The name of the skill folder (e.g., 'mcp_builder')",
                        },
                        file_path: {
                            type: "string",
                            description: "Path to the file within the skill folder. Defaults to 'SKILL.md'",
                            default: "SKILL.md",
                        },
                    },
                    required: ["skill_name"],
                },
            },
            {
                name: "list_skill_files",
                description: "List all files within a specific skill folder",
                inputSchema: {
                    type: "object",
                    properties: {
                        skill_name: {
                            type: "string",
                            description: "The name of the skill folder"
                        }
                    },
                    required: ["skill_name"]
                }
            }
        ],
    };
});
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "list_available_skills": {
            const data = await fetchGitHubContent("");
            if (!Array.isArray(data)) {
                throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Unexpected response format from GitHub");
            }
            const skills = data
                .filter((item) => item.type === "dir")
                .map((item) => ({
                name: item.name,
                url: item.html_url,
            }));
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(skills, null, 2),
                    },
                ],
            };
        }
        case "get_skill_content": {
            const schema = zod_1.z.object({
                skill_name: zod_1.z.string(),
                file_path: zod_1.z.string().optional().default("SKILL.md"),
            });
            const { skill_name, file_path } = schema.parse(request.params.arguments);
            const data = await fetchGitHubContent(`${skill_name}/${file_path}`);
            // GitHub API returns content encoded in base64 for files
            if (data.encoding === "base64" && data.content) {
                const content = Buffer.from(data.content, "base64").toString("utf-8");
                return {
                    content: [
                        {
                            type: "text",
                            text: content
                        }
                    ]
                };
            }
            else {
                throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Could not decode file content or file is not a text file.");
            }
        }
        case "list_skill_files": {
            const schema = zod_1.z.object({
                skill_name: zod_1.z.string()
            });
            const { skill_name } = schema.parse(request.params.arguments);
            const data = await fetchGitHubContent(`${skill_name}`);
            if (!Array.isArray(data)) {
                // It might be a file if the path was wrong, but expecting a dir
                throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Path is not a directory or unexpected response.");
            }
            const files = data.map((item) => ({
                name: item.name,
                type: item.type,
                size: item.size
            }));
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(files, null, 2)
                    }
                ]
            };
        }
        default:
            throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }
});
const transport = new stdio_js_1.StdioServerTransport();
await server.connect(transport);
