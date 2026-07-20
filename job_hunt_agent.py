"""
求职助手 Agent
-----------
工具列表：
  1. analyze_jd          - 解析岗位 JD，提取核心要求
  2. evaluate_match      - 评估简历与 JD 的匹配度（0-100分），给出差距和建议
  3. optimize_resume     - 针对指定 JD 提供简历优化建议
  4. generate_cover_letter - 生成定制化求职信
  5. prepare_interview_qa  - 生成面试高频问题 + 参考回答思路

用法：
  python job_hunt_agent.py
  然后在交互模式中输入你的问题，输入 quit 退出
"""

import os
from dotenv import load_dotenv

load_dotenv()

from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.prebuilt import create_react_agent

# ─────────────────────────────────────────────
# LLM 初始化
# ─────────────────────────────────────────────
llm = ChatOpenAI(
    model="gpt-4o-mini",   # 按需替换，如 gpt-4o / deepseek-chat
    temperature=0.3,
)

# ─────────────────────────────────────────────
# 工具定义
# ─────────────────────────────────────────────

@tool
def analyze_jd(jd_text: str) -> str:
    """
    解析招聘 JD（职位描述），结构化提取：
    - 岗位名称与公司背景
    - 核心职责（3-5条）
    - 必备技能与经验要求
    - 加分项 / 优先条件
    - 隐含的软技能要求
    请将完整的 JD 文本作为输入。
    """
    prompt = f"""请对以下招聘 JD 进行结构化分析，用中文输出：

## JD 原文
{jd_text}

## 请按以下格式输出：

### 岗位定位
（一句话概括岗位的核心价值）

### 核心职责（Top 5）
1. ...

### 硬性要求（必须满足）
- 学历/经验：
- 技术技能：
- 工具/平台：

### 加分项
- ...

### 隐含软技能
- ...

### 面试关键词（5-8个，应在面试中主动提及）
`关键词1` `关键词2` ...
"""
    result = llm.invoke(prompt)
    return result.content


@tool
def evaluate_match(resume_text: str, jd_text: str) -> str:
    """
    评估候选人简历与 JD 的匹配程度。
    输入格式：resume_text=简历内容, jd_text=JD内容
    输出：匹配分数(0-100)、优势项、差距项、改进优先级。
    """
    prompt = f"""你是一位资深HR，请严格评估以下简历与岗位的匹配度。

## 简历
{resume_text}

## 岗位 JD
{jd_text}

## 请按以下格式输出：

### 综合匹配分：X/100

### 优势项（简历亮点匹配JD的地方）
✅ ...

### 差距项（JD要求但简历缺失或薄弱的地方）
❌ ...

### 改进优先级（按重要性排序）
1. 【高优先】...
2. 【中优先】...
3. 【低优先】...

### 总体建议（2-3句话）
...
"""
    result = llm.invoke(prompt)
    return result.content


@tool
def optimize_resume(resume_text: str, jd_text: str) -> str:
    """
    针对特定 JD，对简历进行逐项优化，提供可直接替换的改写建议。
    输入：resume_text=当前简历内容, jd_text=目标岗位JD
    """
    prompt = f"""你是一位专业的简历顾问，请针对以下 JD 对简历进行优化改写建议。

## 当前简历
{resume_text}

## 目标岗位 JD
{jd_text}

## 优化要求：
1. 用 STAR 法则（情境-任务-行动-结果）重写工作经历中的关键条目
2. 在每条建议后给出【原文】→【优化后】的对比
3. 指出简历中应补充的关键词（直接从JD提取）
4. 建议调整的简历结构顺序（哪些放前面更有利）

请逐项输出优化建议：
"""
    result = llm.invoke(prompt)
    return result.content


@tool
def generate_cover_letter(
    resume_text: str,
    jd_text: str,
    applicant_name: str = "求职者",
    company_name: str = "贵公司",
) -> str:
    """
    根据简历和 JD 生成一封有针对性的求职信（500-600字）。
    参数：
      resume_text   - 简历内容
      jd_text       - 岗位 JD
      applicant_name - 求职者姓名（可选，默认"求职者"）
      company_name   - 目标公司名称（可选）
    """
    prompt = f"""请根据以下信息，为{applicant_name}撰写一封投递{company_name}的求职信。

## 简历摘要
{resume_text}

## 目标岗位 JD
{jd_text}

## 写作要求：
- 开头：用1-2句话表明应聘意向，展示对公司/岗位的了解
- 中间：选取3个与JD最匹配的经历亮点，用数据/结果支撑
- 结尾：表达热情，提出面试请求
- 语气：专业自信，不卑不亢
- 长度：500-600字
- 格式：正式信件格式

求职信正文：
"""
    result = llm.invoke(prompt)
    return result.content


@tool
def prepare_interview_qa(jd_text: str, resume_text: str = "") -> str:
    """
    根据 JD（和可选的简历）预测面试高频问题，并给出回答思路。
    输入：jd_text=岗位JD（必填），resume_text=简历内容（可选，填写后问题更个性化）
    """
    resume_section = f"\n## 候选人简历\n{resume_text}" if resume_text.strip() else ""
    prompt = f"""你是一位面试官，请根据以下岗位 JD 预测高频面试问题，并给出回答框架。

## 岗位 JD
{jd_text}{resume_section}

## 请输出以下类别的问题（共10-12题）：

### 一、自我介绍 & 背景
Q1: ...
💡 回答要点：...

### 二、专业技能考察（根据JD核心技能出题）
Q2: ...
💡 回答要点：...
（共3-4题）

### 三、行为面试题（STAR法则）
Q5: 描述一次...
💡 STAR框架：情境→任务→行动→结果

### 四、场景/压力测试题
Q8: 如果...你会怎么做？
💡 回答要点：...

### 五、候选人反问环节（建议问面试官的问题）
- ...
- ...
"""
    result = llm.invoke(prompt)
    return result.content


# ─────────────────────────────────────────────
# 构建 Agent
# ─────────────────────────────────────────────
tools = [analyze_jd, evaluate_match, optimize_resume, generate_cover_letter, prepare_interview_qa]

SYSTEM_PROMPT = """你是一位经验丰富的求职顾问，帮助用户提升求职成功率。

你可以：
- 解析招聘 JD，提炼核心要求
- 评估简历与岗位的匹配度
- 提供简历针对性优化建议
- 撰写定制化求职信
- 预测面试问题并给出回答框架

使用原则：
1. 优先调用工具完成分析，不要凭空猜测
2. 对于需要简历或JD的工具，如用户未提供，先礼貌询问
3. 结果要具体、可执行，避免泛泛而谈
4. 所有输出使用中文"""

agent = create_react_agent(llm, tools, prompt=SYSTEM_PROMPT)


# ─────────────────────────────────────────────
# 交互入口
# ─────────────────────────────────────────────
def chat(user_input: str, history: list) -> str:
    history.append(HumanMessage(content=user_input))
    result = agent.invoke({"messages": history})
    reply = result["messages"][-1].content
    history.append(result["messages"][-1])
    return reply


def main():
    print("=" * 55)
    print("  求职助手 Agent（输入 quit 退出）")
    print("=" * 55)
    print("我能帮你：")
    print("  • 解析岗位 JD，提炼核心要求")
    print("  • 评估简历匹配度，找出差距")
    print("  • 优化简历表达，对齐 JD 关键词")
    print("  • 生成定制化求职信")
    print("  • 预测面试题 + 回答框架")
    print("-" * 55)

    history = []
    while True:
        try:
            user_input = input("\n你：").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n再见！")
            break

        if not user_input:
            continue
        if user_input.lower() in ("quit", "exit", "退出"):
            print("祝求职顺利！")
            break

        print("\nAgent：", end="", flush=True)
        reply = chat(user_input, history)
        print(reply)


if __name__ == "__main__":
    main()
