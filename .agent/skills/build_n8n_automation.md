---
description: Standard Operating Procedure for building n8n automations based on user guidelines
---

1. **Search Templates**:
   - Use the `browser_subagent` to navigate to [n8n.io/workflows](https://n8n.io/workflows/).
   - Search for templates relevant to the user's request.
   - Analyze the search results and select the best matching template.
   - *Alternative*: Use `mcp_n8n-mcp_search_templates` for a quick check if browser access is overkill.

2. **Plan the Automation**:
   - Review the selected template structure.
   - Map the user's specific requirements to the template.
   - Outline the necessary modifications (nodes to add/remove, logic changes).

3. **Implementation (Create/Import)**:
   - Use `mcp_n8n-mcp_n8n_create_workflow` to create the new workflow in the n8n instance.
   - If adapting a template, ensure the node types and connections are correctly translated to the tool's format.

4. **Configuration & Testing**:
   - Ask the user for any missing credentials or configuration details (API keys, IDs).
   - *Security Note*: Instruct the user to enter sensitive credentials directly in the n8n UI if possible, or provide them securely.
   - Test the workflow. If it has a webhook, use `mcp_n8n-mcp_n8n_trigger_webhook_workflow`. Otherwise, ask the user to run it manually and report back, or use `mcp_n8n-mcp_n8n_get_execution` to view recent runs.

5. **Debug & Refine**:
   - If errors occur, analyze the execution data.
   - Apply fixes using `mcp_n8n-mcp_n8n_update_partial_workflow` or `mcp_n8n-mcp_n8n_update_full_workflow`.
   - Retest until the workflow executes successfully.

6. **Documentation (Sticky Notes)**:
   - Once stable, add Sticky Note nodes (`n8n-nodes-base.stickyNote`) to the canvas.
   - **Content to include**:
     - How the data flows.
     - How the workflow works.
     - API Key/Credential requirements.
     - Authentication guides.
   - Use `mcp_n8n-mcp_n8n_update_partial_workflow` to add these notes.
