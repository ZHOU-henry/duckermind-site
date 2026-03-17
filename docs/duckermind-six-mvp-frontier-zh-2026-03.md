# Duckermind 六个 MVP 项目总纲

更新时间：2026-03-17

本文档站在 Duckermind 整体视角，对当前 6 个 MVP 项目做一次中文版的系统整理。它不是网页文案的简单翻译，而是把网页中的 `Frontier Progress`、`Research Agenda`、`Open Questions`、`Current Source Base`、关键 topic 和当前互相关系重新整合为一个更适合长期研究与项目管理的中文总纲。

---

## 一、Duckermind 的整体结构

Duckermind 当前的 6 个 MVP 并不是 6 个互不相干的项目，而是一套相互耦合的前沿系统：

1. `Agora`
   面向 AI agent 的需求聚合、构建、交付与协作市场层。
2. `Noesis`
   面向 AGI 时代社会结构、AI 政治经济与制度协调的研究与观测层。
3. `Peras`
   面向 AI 方向判断、信号排序与前沿情报聚合的“判断引擎”层。
4. `Physis`
   面向物理 AI / 机器人系统的 simulator-first 工程框架层。
5. `Titan`
   面向具身智能、世界模型、安全代理与长期机器人研究的高阶研究层。
6. `Autogenesis`
   面向 AI4AI、自我改进回路、评估器体系与搜索式系统提升的研究层。

可以把这 6 个项目理解为一个闭环：

- `Peras` 负责看清“什么方向值得做”
- `Noesis` 负责理解“这些方向会如何改变社会与制度结构”
- `Agora` 负责把 agent 供需与交付组织起来
- `Physis` 负责把物理 AI 的工程骨架搭出来
- `Titan` 负责把具身智能和安全代理问题拉到长期研究层
- `Autogenesis` 负责研究 AI 如何稳定地改进 AI 本身

从系统关系上看：

- `Peras` 是前沿排序器
- `Noesis` 是宏观解释器
- `Agora` 是市场执行器
- `Physis` 是物理工程底盘
- `Titan` 是具身长期研究器
- `Autogenesis` 是 AI4AI 加速器

---

## 二、Agora

### 1. 项目定位

`Agora` 的真正目标不是“Henry 的 agent 目录页”，而是一个开放的 AI agent 平台：

- 用户提出需求
- 多个 agent builder 或 agent 团队响应
- 平台负责匹配、协作、交付、追踪

它本质上是 AI 时代的“任务市场 + agent 供应链 + 交付控制层”。

### 2. 当前页面结构对应的产品视图

当前网页上的 Agora 已经体现出几条关键产品线：

- `Platform`
  定义平台的多边结构，而不是单一聊天机器人产品。
- `Customer Flow`
  需求提交、澄清、匹配、执行、交付、复盘的路径。
- `Builder Studio`
  agent 开发者/构建者的工作台。
- `Engagement Workspace`
  交付过程中客户、agent、平台之间的协作空间。
- `Market Ops`
  平台的运营、质量控制、供给治理和规则层。

### 3. Frontier Research

Agora 的前沿研究核心不在“再做一个聊天 UI”，而在于：

- agent 作为劳动单元的组织方式
- 多 agent 供给与质量分层
- 任务描述与能力描述的标准化
- 可交付性、可验证性、可追责性的工作流设计

当前最 relevant 的前沿参照包括：

- OpenAI Codex / coding-agent 类系统
- OpenHands
- LangGraph / LangChain agent 工程栈
- Dify / Flowise 一类 workflow 编排层
- OpenClaw 一类多平台 agent runtime

这些系统共同说明了一点：

> AI agent 的价值不只是“会不会回答”，而是“能不能被组织进任务、工作流、交付、验证和持续协作里”。

### 4. Open Questions

- agent 的能力描述应该如何标准化？
- builder 上传的 agent 如何被验证而不是只被宣传？
- 平台应该如何区分“试验性 agent”“可交付 agent”“高可靠 agent”？
- 一个需求应该如何拆分为单 agent、agent team、human+agent 混合执行？
- agent 的历史交付记录、失败记录、风格偏好、工具权限如何表达成平台资产？

### 5. Research Agenda

Agora 当前更合理的研究/构建议程是：

1. 定义需求对象
   需求不是一句 prompt，而是具备输入、目标、约束、验收条件的任务对象。
2. 定义供给对象
   agent 不是“一个模型名”，而是一个能力包：工具、工作流、验证方式、领域边界、成本结构。
3. 定义交付对象
   交付不只是回答文本，而是 issue、PR、报告、分析表、设计稿、运行记录等结构化产物。
4. 定义治理对象
   平台要管理失败、风险、权限、质量和复用，不只是撮合。

### 6. Current Source Base

- OpenAI Codex GitHub
  <https://github.com/openai/codex>
- OpenHands
  <https://github.com/OpenHands/OpenHands>
- LangChain
  <https://github.com/langchain-ai/langchain>
- LangGraph
  <https://github.com/langchain-ai/langgraph>
- Dify
  <https://github.com/langgenius/dify>
- OpenClaw
  <https://github.com/openclaw/openclaw>

### 7. 核心公式 / 算法理解

Agora 不是学术公式先行的项目，但为了理解平台结构，可以用一个简化的匹配函数：

```text
MatchScore(task, agent) =
  α · CapabilityFit
  + β · DeliveryReliability
  + γ · DomainExperience
  + δ · ToolAccessFit
  - ε · CostMismatch
  - ζ · RiskPenalty
```

解释：

- `CapabilityFit`：能力是否对题
- `DeliveryReliability`：历史可交付性
- `DomainExperience`：是否真做过类似任务
- `ToolAccessFit`：需要的工具权限是否具备
- `CostMismatch`：成本/预算不匹配
- `RiskPenalty`：高风险任务或高不确定度惩罚

### 8. 当前判断

Agora 的难点不是前端，而是：

- 任务对象模型
- agent 对象模型
- 工作流与验证对象模型

只有这三层站住，Agora 才会从“AI agent marketplace 概念页”变成真正的平台原型。

---

## 三、Noesis

### 1. 项目定位

`Noesis` 是 Duckermind 里最宏观的一层。它研究的是：

- AGI 时代的 AI 政治经济
- 社会协调与制度合法性
- 机器能力增长与人类制度结构的关系
- 六要素 AI 经济观测体系

如果说 Peras 负责“判断方向”，Noesis 负责“解释这些方向对社会意味着什么”。

### 2. 当前页面结构

当前网页里 Noesis 的核心结构已经比较清晰：

- `Frontier Progress`
  当前世界在往哪里移动。
- `Research Agenda`
  Noesis 要追的核心问题与计划。
- `Economy Observatory`
  六要素 AI 经济观测面板。
- `Interactive Globe`
  把国家级观测数据可视化。
- `Methodology`
  说明哪些是直接测量，哪些是代理指标，哪些只是推断。

### 3. Frontier Research

Noesis 当前最关键的前沿研究对象，不是“AI 哲学空谈”，而是四条线的汇合：

1. `AI Economics`
   AI 的经济效应越来越不能只用“提升生产率”来描述，基础设施集中、劳动力暴露、能源瓶颈、区域不平衡都已显著化。
2. `Institutional Software`
   Pol.is、Decidim、CONSUL 等系统说明，制度协调本身已经可以作为软件对象来研究。
3. `Substrate Observability`
   GH Archive、OpenAlex、Electricity Maps、Stanford HAI vibrancy 之类公开源说明，AI 经济的底层已经部分可观测。
4. `Machine Agency`
   随着 agent 与协作型系统的发展，机器越来越像社会中的行动者，而不只是工具。

### 4. Open Questions

- 未来真正的六大瓶颈因子会是哪几个？
- 市场、计划与“交往理性式协调”在 AGI 时代各自适合什么领域？
- 什么社会功能在机器能力高度增长后仍然需要强人类合法性？
- AI 经济中的权力集中到底发生在模型层、算力层、能源层还是制度层？
- 如何把“政治经济理论”变成一个可验证的观测层？

### 5. Research Agenda

Noesis 当前比较清楚的议程是：

1. 把 AI 经济的六要素框架做成真实 observatory
2. 把“制度软件”作为制度研究的产品化接口
3. 把交往理性与后价格协调问题拉到 AI 时代重新讨论
4. 把宏观研究与公开数据源绑定，而不是仅靠大词

### 6. Current Source Base

- Stanford HAI / Global AI Vibrancy Tool
  <https://d3i91vx6n7fixv.cloudfront.net/>
- Anthropic Economic Index
  <https://www.anthropic.com/news/anthropic-economic-index>
- OpenAlex
  <https://openalex.org/>
- GH Archive
  <https://www.gharchive.org/>
- Pol.is
  <https://pol.is/home>
- Decidim
  <https://decidim.org/>
- CONSUL
  <https://consuldemocracy.org/>
- AWS Global Infrastructure
  <https://aws.amazon.com/about-aws/global-infrastructure/>
- Azure Geographies
  <https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/>
- Alibaba Cloud Global Locations
  <https://www.alibabacloud.com/en/global-locations>

### 7. 核心公式 / 算法理解

Noesis 当前最重要的公式是 observatory index：

```text
ObservatoryIndex(region, t) =
  Σ (w_i · Factor_i(region, t)) - BottleneckPenalty(region, t)
```

其中 `Factor_i` 对应：

- Compute
- Algorithms
- Data / open artifact ecosystems
- Storage / cloud region surface
- Energy
- AI Talent

它不是因果证明，而是一个可审查的比较框架。

### 8. 当前判断

Noesis 的真正价值在于：

> 把 AGI 时代最容易空洞化的宏观讨论，拉回到制度、基础设施和可观测数据上。

它应该继续成为 Duckermind 的“宏观解释器 + 观测器”。

---

## 四、Peras

### 1. 项目定位

`Peras` 是“方向判断引擎”。它不只是做资讯聚合，而是试图做：

- AI 方向排序
- 信号加权
- 方向 thesis cards
- 不确定性可视化
- 历史回测与修正

它的本质不是 feed，而是 judgment system。

### 2. 当前页面结构

- `Frontier Progress`
  当前高信号方向
- `Research Agenda`
  问题、公式、计划
- `Ranking Engine`
  方向打分原型
- `Signal Atlas`
  更广的信号输入框架
- `GitHub Stars`
  历史高星 + 分类页 + 新秀模块

### 3. Frontier Research

Peras 目前最 relevant 的前沿线包括：

- Agentic coding economy
- Reasoning / post-training systems
- Compute + energy infra
- Governance / evaluation stack
- Developer tooling for AI stack
- AI economics / frontier intelligence 本身

它们的共同点是：不只是模型更强，而是“系统价值密度更高”。

### 4. Open Questions

- 什么信号最能预测长期价值而不是短期热度？
- GitHub stars、论文速度、产品发布、企业采用、宏观瓶颈应该怎么加权？
- ranking 应该怎样表达置信度，而不是只给一个大分数？
- 怎样用历史数据检验当前 ranking 是否真的有用？

### 5. Research Agenda

1. 明确信号层
   - research
   - product
   - open-source
   - macro / bottleneck
2. 明确权重层
   不同类别用不同权重
3. 明确不确定性层
   让 ranking 可挑战、可修正
4. 明确历史检验层
   让它对过去周期有解释力

### 6. Current Source Base

- GitHub REST API
  <https://docs.github.com/en/rest>
- GH Archive
  <https://www.gharchive.org/>
- Stanford HAI AI Index / vibrancy indicators
  <https://d3i91vx6n7fixv.cloudfront.net/>
- OpenAI Research
  <https://openai.com/research/>
- Anthropic Research
  <https://www.anthropic.com/research>
- Google DeepMind
  <https://deepmind.google/research/>

### 7. 核心公式 / 算法理解

Peras 当前最核心的方向打分公式是：

```text
DirectionScore =
  α·Research
  + β·Product
  + γ·OpenSource
  + δ·Macro
  - ε·ExecutionRisk
  - ζ·HypePenalty
```

这个公式最重要的意义不是精确，而是显式化：

- 奖励什么
- 惩罚什么
- 哪些是可见证据
- 哪些是高风险叙事

### 8. 当前判断

Peras 的核心不是“做更多信号”，而是“做更可审查的判断”。  
它将成为 Duckermind 体系里的“决策前哨站”。

---

## 五、Physis

### 1. 项目定位

`Physis` 是 Duckermind 的 simulator-first physical AI framework。  
它不是直接许诺“通用机器人产品”，而是先把物理 AI 的工程骨架搭清楚：

- simulation
- perception
- control
- datasets
- ROS runtime

### 2. 当前页面结构

现在 Physis 页面结构已经扩成：

- `Frontier Progress`
- `Research Agenda`
- `Simulation Stack`
- `System Modules`
- `Perception Stack`
- `Control Stack`
- `Dataset Engine`
- `ROS Runtime`

### 3. Frontier Research

Physis 最值得盯的前沿不是单一模型，而是四类工程基础设施：

1. `Open robot data engine`
   LeRobot / Open X-Embodiment 一类系统正在把机器人数据变成真正可复用基础设施。
2. `Vision-language-action policies`
   OpenVLA、Gemini Robotics 等说明 VLA 已经成为 serious control interface。
3. `Simulator-first training`
   Isaac Lab、MuJoCo Playground 等系统说明 simulation substrate 仍然是 policy iteration 的核心环境。
4. `Runtime integration`
   ROS2 类 runtime 仍然是设备、感知、控制和观测真正汇合的地方。

### 4. Open Questions

- 机器人数据的统一接口应该怎样设计？
- simulator fidelity 到底应该如何预算？
- perception / planner / policy / actuation 的边界应该如何切？
- sim-to-real 的真实瓶颈更多来自模型、数据还是 runtime？
- ROS 层要保留多厚，哪些逻辑应上移到 policy / planner？

### 5. Research Agenda

Physis 当前最重要的 agenda：

1. 做清楚 robot data pipeline
2. 对 simulator 选择做基准比较
3. 让 perception 到 control 的接口更显式
4. 设计一套可用的 ROS deployment spine

### 6. Current Source Base

- LeRobot
  <https://github.com/huggingface/lerobot>
- Open X-Embodiment
  <https://robotics-transformer-x.github.io/>
- OpenVLA
  <https://openvla.github.io/>
- Gemini Robotics
  <https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/>
- Isaac Lab
  <https://isaac-sim.github.io/IsaacLab/>
- MuJoCo Playground
  <https://github.com/google-deepmind/mujoco_playground>
- ROS 2
  <https://docs.ros.org/en/rolling/index.html>

### 7. 核心公式 / 算法理解

Physis 当前一个很有代表性的理解公式是：

```text
L_total =
  L_task
  + λ_align · ||z_sim - z_real||
  + λ_risk · SafetyPenalty
  + λ_latency · RuntimeCost
```

它不是在说“真实系统就该这么训练”，而是在说明：

- 任务成功
- sim-real 表征对齐
- 风险
- runtime 成本

应该被一起看，而不是只看离线成功率。

### 8. 当前判断

Physis 的方向是对的，因为它没有过早跳进“造整机神话”，而是先搭：

- 数据
- simulation
- control boundaries
- runtime spine

这更像真正有可能长出来的 physical AI framework。

---

## 六、Titan

### 1. 项目定位

`Titan` 是 6 个项目里时间尺度最长的一层。它研究的是：

- embodied intelligence
- world models
- decision architectures
- safe agency
- hardware constraints

Titan 不该是“马上做 humanoid 产品”的空喊，而应是 Duckermind 的具身长期研究器。

### 2. 当前页面结构

现在 Titan 页面结构已经扩成：

- `Frontier Progress`
- `Research Agenda`
- `Embodied Stack`
- `Safety Architecture`
- `World Model Stack`
- `Decision Stack`
- `Hardware Stack`
- `Safe Agency`

### 3. Frontier Research

Titan 当前最重要的前沿线：

1. `Embodied foundation models`
   Gemini Robotics、OpenVLA 一类系统说明 embodied policy 已经进入 foundation-model 阶段。
2. `World foundation models`
   NVIDIA Cosmos / Genie 类系统说明环境建模和可 rollout 的 latent world 正在成为中心能力。
3. `Generalist robot policy stacks`
   π0.5 / OpenPI 等系统说明 generalist embodied policy 已经不只是实验室概念。
4. `Safe agency architecture`
   随着系统越来越能 act in the world，bounded action、override、audit 变成第一性问题。

### 4. Open Questions

- robust embodiment 到底需要什么层级的 world model？
- decision authority 应该在 planner / policy / verifier / human override 之间如何分布？
- safe agency 如何变成 architecture，而不是 compliance 文案？
- 硬件身体的限制如何进入模型与策略设计，而不是被后置处理？

### 5. Research Agenda

1. 明确 embodied stack layer map
2. 跟踪 embodied frontier systems
3. 设计 safe-agency architecture
4. 区分 serious embodied research 与 demo narratives

### 6. Current Source Base

- Gemini Robotics
  <https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/>
- OpenVLA
  <https://openvla.github.io/>
- NVIDIA Cosmos
  <https://developer.nvidia.com/blog/build-physical-ai-world-foundation-models-and-synthetic-data-generation-pipelines-with-nvidia-cosmos/>
- Physical Intelligence π0.5
  <https://www.physicalintelligence.company/blog/pi05>
- OpenPI
  <https://github.com/Physical-Intelligence/openpi>

### 7. 核心公式 / 算法理解

Titan 当前最适合用一个 safe-agency objective 来理解：

```text
J_embodied =
  E[Σ_t r_t]
  - λ_risk · Risk(trajectory)
  - λ_override · InterventionCost
  - λ_uncertainty · ModelError
```

直觉上它表达的是：

- 任务回报不是唯一目标
- 轨迹风险要扣分
- 越依赖人工干预，系统越不成熟
- 世界模型误差会直接侵蚀可行动性

### 8. 当前判断

Titan 的核心不是“再做一个机器人项目”，而是：

> 在 embodied foundation models、world models 和 safe agency 之间，建立一个真正长期有效的研究接口。

如果 Duckermind 将来真往具身系统深入，Titan 会成为理论和系统设计上的锚点。

---

## 七、Autogenesis

### 1. 项目定位

`Autogenesis` 是 AI4AI / self-improvement / meta-learning / recursive improvement 的研究层。  
它应该研究的是可测量的 AI 改进回路，而不是经典科幻意义上的“失控式 RSI”。

### 2. 当前页面结构

Autogenesis 当前已具备：

- `Frontier Progress`
- `Research Agenda`
- `AI4AI Program`
- `Control Loops`
- 各类 topic 页面：
  - LM optimization
  - agentic coding
  - RLHF infrastructure
  - evolutionary / search systems
  - promotion gate
  - evaluator trust
  - improvable loops

### 3. Frontier Research

Autogenesis 当前最关键的 frontier classes：

1. `LM optimization`
   DSPy 一类系统说明 LM workflow 可以被程序化优化。
2. `Agentic coding`
   OpenHands / SWE-agent 让“AI 改进代码工件”成为可观测环境。
3. `RLHF infrastructure`
   OpenRLHF、verl 等说明 evaluator / post-training infra 已成熟到可成为研究底盘。
4. `Evolutionary / search systems`
   AlphaEvolve、AlphaDev、FunSearch 把“AI 改进 AI-adjacent systems”拉回到具体、可检验的机制上。

### 4. Open Questions

- 哪些改进回路是真的有收益的？
- promotion gate 应该如何设计？
- evaluator 应该如何被信任？
- 哪些 loop class 值得优先投入？
- 如何把 AI4AI 做成工程系统而不是概念口号？

### 5. Research Agenda

1. 画出 loop taxonomy
2. 给每种 loop 配 benchmark 环境
3. 把 control architecture 做清楚
4. 用 open-source landscape 跟踪真实前沿

### 6. Current Source Base

- AlphaEvolve
  <https://deepmind.google/discover/blog/alphaevolve-a-coding-agent-for-scientific-and-algorithmic-discovery/>
- AlphaDev
  <https://deepmind.google/discover/blog/alphadev-discovers-faster-sorting-algorithms/>
- FunSearch
  <https://deepmind.google/discover/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/>
- DSPy
  <https://github.com/stanfordnlp/dspy>
- OpenHands
  <https://github.com/OpenHands/OpenHands>
- OpenRLHF
  <https://github.com/OpenRLHF/OpenRLHF>
- verl
  <https://github.com/volcengine/verl>

### 7. 核心公式 / 算法理解

Autogenesis 当前最关键的公式是 promotion gate：

```text
Promote(candidate_t)
if Gain_t × Reliability_t - Risk_t > Threshold
```

这背后的思想是：

- 不是什么 candidate 看起来有提升就值得 promotion
- gain 要和 reliability 一起看
- risk 不是附注，而是主变量

### 8. 当前判断

Autogenesis 最有价值的地方在于：

> 它把“AI 如何改进 AI”这件事，从空洞神话拉回到了 evaluator、search、coding、post-training、promotion 这些可测量机制上。

如果做得好，它会成为 Duckermind 内部最关键的“能力递增器”。

---

## 八、六项目之间的系统关系

### 1. 研究与执行闭环

- `Peras` 决定“值得押注什么”
- `Noesis` 解释“这些押注会改变什么”
- `Agora` 负责把这些能力变成平台与市场
- `Physis` 把物理 AI 的工程骨架搭起来
- `Titan` 提供具身长期研究方向
- `Autogenesis` 提供 AI4AI 加速回路

### 2. 中短期与长期

中短期更可执行的项目：

- Agora
- Peras
- Noesis observatory
- Physis simulator-first stack

更长期、但必须现在打底的项目：

- Titan
- Autogenesis

### 3. 哪个项目最容易“漂”

最容易漂的项目：

- Titan
- Autogenesis
- Noesis

因为它们最容易滑向大词。  
所以它们必须被：

- observatory / data
- benchmark / loop classes
- source packs
- structured agendas

这些具体结构持续拉住。

### 4. 哪个项目最容易“过窄”

最容易过窄的项目：

- Agora
- Physis
- Peras

因为它们容易被做成单个 demo：

- Agora 变成单供给 agent 商店
- Physis 变成单个仿真 demo
- Peras 变成信息看板

所以它们要一直保持平台化和方法化方向。

---

## 九、当前总体判断

Duckermind 这 6 个 MVP 已经具备一个罕见的结构优点：

> 它不是在同一层上堆 6 个相似产品，而是在“市场、判断、社会解释、物理工程、具身研究、AI4AI”六个互补层上布局。

当前最重要的不是继续增项目数量，而是继续把这 6 个项目的：

- 页面结构
- source base
- open questions
- agenda
- formulas
- deliverables

持续从“概念型”推向“可检验型”。

---

## 十、建议的下一阶段优先级

### P1

- 继续强化 `Noesis Observatory` 的可解释数据层
- 继续把 `Peras` 做成真正的 ranking / thesis 系统
- 继续推进 `Agora` 的任务对象、供给对象、交付对象模型

### P2

- 把 `Physis` 的 simulator / data / runtime 设计拉到更像真实 framework 的粒度
- 把 `Autogenesis` 的 loop taxonomy 和 promotion architecture 继续做硬

### P3

- 让 `Titan` 逐渐形成真正的 embodied long-horizon research map

---

## 十一、附：每个项目最核心的一条理解句

- `Agora`：把 agent 组织成可交易、可交付、可验证的劳动系统。
- `Noesis`：把 AGI 时代的社会与经济变化变成可解释、可观测的研究框架。
- `Peras`：把信息洪流压缩成可挑战、可修正的方向判断。
- `Physis`：把 physical AI 的工程骨架先搭稳，再谈更大系统。
- `Titan`：在具身智能中同时研究能力、世界模型和安全代理。
- `Autogenesis`：把 AI 改进 AI 的过程变成受控、可测量、可推广的回路体系。

