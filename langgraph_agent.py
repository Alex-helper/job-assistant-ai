"""
LangGraph 多步骤状态机 Agent 示例
适合需要自定义节点、条件路由的复杂 Agent 场景
"""

from typing import Annotated, TypedDict
from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

# ── 状态定义 ───────────────────────────────────────────────
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]

# ── 工具 ───────────────────────────────────────────────────
@tool
def search_web(query: str) -> str:
    """模拟网络搜索（实际使用可接入 Tavily/SerpAPI 等）。"""
    return f"搜索 '{query}' 的结果：这是一段模拟的搜索结果内容。"

tools = [search_web]

# ── LLM ───────────────────────────────────────────────────
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0).bind_tools(tools)

# ── 节点函数 ───────────────────────────────────────────────
def call_model(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def should_continue(state: AgentState) -> str:
    """如果最后一条消息包含工具调用，则继续；否则结束。"""
    last_message = state["messages"][-1]
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return END

# ── 构建图 ─────────────────────────────────────────────────
graph_builder = StateGraph(AgentState)
graph_builder.add_node("agent", call_model)
graph_builder.add_node("tools", ToolNode(tools))

graph_builder.set_entry_point("agent")
graph_builder.add_conditional_edges("agent", should_continue)
graph_builder.add_edge("tools", "agent")

graph = graph_builder.compile()

# ── 运行 ───────────────────────────────────────────────────
if __name__ == "__main__":
    query = "帮我搜索一下 LangGraph 的最新特性"
    print(f"用户: {query}\n" + "-" * 40)
    result = graph.invoke({"messages": [HumanMessage(content=query)]})
    print(f"Agent: {result['messages'][-1].content}")
