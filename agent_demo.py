"""
LangChain Agent 开发入门示例
包含：
  1. 基础 ReAct Agent（工具调用）
  2. LangGraph 状态机 Agent
"""

import os
from dotenv import load_dotenv

load_dotenv()  # 从 .env 读取 OPENAI_API_KEY 等配置

from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent

# ── 1. 定义工具 ────────────────────────────────────────────
@tool
def add(a: float, b: float) -> float:
    """将两个数相加，返回结果。"""
    return a + b

@tool
def multiply(a: float, b: float) -> float:
    """将两个数相乘，返回结果。"""
    return a * b

@tool
def get_weather(city: str) -> str:
    """查询指定城市的天气（模拟数据）。"""
    mock_data = {
        "北京": "晴天，25°C",
        "上海": "多云，22°C",
        "广州": "小雨，28°C",
    }
    return mock_data.get(city, f"{city} 的天气数据暂不可用")

tools = [add, multiply, get_weather]

# ── 2. 初始化 LLM ──────────────────────────────────────────
llm = ChatOpenAI(
    model="gpt-4o-mini",          # 按需替换模型名
    temperature=0,
    # api_key 和 base_url 会自动从环境变量读取
)

# ── 3. 创建 ReAct Agent ────────────────────────────────────
agent = create_react_agent(llm, tools)

# ── 4. 运行 Agent ──────────────────────────────────────────
def run(query: str):
    print(f"\n用户: {query}")
    print("-" * 40)
    result = agent.invoke({"messages": [("human", query)]})
    answer = result["messages"][-1].content
    print(f"Agent: {answer}")
    return answer

if __name__ == "__main__":
    # 示例查询
    run("3.5 乘以 12 等于多少？")
    run("北京和上海的天气分别是怎样的？")
    run("先算 100 + 200，再把结果乘以 3")
