import { tools, ToolType } from "@/config/tools";
import React from "react";

const ToolPage = async ({ params }: { params: Promise<{ tool: string }> }) => {
  const toolType = (await params).tool as ToolType;
  const tool = tools[toolType];

  return (
    <div className="p-5 mt-4">
      <div>
        <h1 className="text-3xl font-bold">{tool.title}</h1>
        <span className="text-muted-foreground">{tool.description}</span>
      </div>
      <div className="py-4 max-w-2xl">
        <tool.component />
      </div>
    </div>
  );
};

export default ToolPage;
