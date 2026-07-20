// LeetCode Hot 100 精选题库
// 每题包含: id, lcid, title, difficulty, tags, description, examples, template, setup_code

const PROBLEMS = [

// ── 1. 两数之和 ──────────────────────────────────────
{
  id: 1, lcid: 1, title: "两数之和", difficulty: "简单",
  tags: ["数组", "哈希表"],
  description: `给定一个整数数组 \`nums\` 和一个整数目标值 \`target\`，请你在该数组中找出**和为目标值** \`target\` 的那**两个**整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。可以按任意顺序返回答案。

**提示：** 使用哈希表将时间复杂度降低至 O(n)。`,
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9，返回 [0, 1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    { input: "nums = [3,3], target = 6", output: "[0,1]" },
  ],
  template: `class Solution:
    def twoSum(self, nums, target):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [2,7,11,15], 9, [0,1], "nums=[2,7,11,15], target=9"),
        (2, [3,2,4], 6, [1,2], "nums=[3,2,4], target=6"),
        (3, [3,3], 6, [0,1], "nums=[3,3], target=6"),
    ]
    results = []
    for no, nums, target, expected, inp in cases:
        try:
            out = sol.twoSum(nums[:], target)
            passed = sorted(out) == sorted(expected)
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 2. 字母异位词分组 ───────────────────────────────────
{
  id: 2, lcid: 49, title: "字母异位词分组", difficulty: "中等",
  tags: ["数组", "哈希表", "字符串", "排序"],
  description: `给你一个字符串数组，请你将**字母异位词**组合在一起（字母异位词是由重新排列源单词所有字母得到的新单词），可以按任意顺序返回。`,
  examples: [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    { input: 'strs = [""]', output: '[[""]]' },
    { input: 'strs = ["a"]', output: '[["a"]]' },
  ],
  template: `class Solution:
    def groupAnagrams(self, strs):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, ["eat","tea","tan","ate","nat","bat"],
         [{"bat"},{"nat","tan"},{"ate","eat","tea"}], 'strs=["eat",...]'),
        (2, [""], [{""}], 'strs=[""]'),
        (3, ["a"], [{"a"}], 'strs=["a"]'),
    ]
    results = []
    for no, strs, expected, inp in cases:
        try:
            out = [set(g) for g in sol.groupAnagrams(strs[:])]
            passed = sorted([sorted(s) for s in out]) == sorted([sorted(s) for s in expected])
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 3. 最长连续序列 ────────────────────────────────────
{
  id: 3, lcid: 128, title: "最长连续序列", difficulty: "中等",
  tags: ["数组", "哈希表"],
  description: `给定一个未排序的整数数组 \`nums\`，找出数字**连续的最长序列**（不要求序列元素在原数组连续）的长度，要求时间复杂度 O(n)。`,
  examples: [
    { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4]" },
    { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" },
  ],
  template: `class Solution:
    def longestConsecutive(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [100,4,200,1,3,2], 4, "[100,4,200,1,3,2]"),
        (2, [0,3,7,2,5,8,4,6,0,1], 9, "9连续"),
        (3, [], 0, "空数组"),
        (4, [1,2,0,1], 3, "含重复"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.longestConsecutive(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 4. 移动零 ───────────────────────────────────────
{
  id: 4, lcid: 283, title: "移动零", difficulty: "简单",
  tags: ["数组", "双指针"],
  description: `给定一个数组 \`nums\`，编写一个函数将所有 \`0\` 移动到数组的末尾，同时保持非零元素的相对顺序。

**请注意**，必须在**不复制数组**的情况下**原地**对数组进行操作。`,
  examples: [
    { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
    { input: "nums = [0]", output: "[0]" },
  ],
  template: `class Solution:
    def moveZeroes(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [0,1,0,3,12], [1,3,12,0,0], "nums=[0,1,0,3,12]"),
        (2, [0], [0], "nums=[0]"),
        (3, [1,0,0,2,3], [1,2,3,0,0], "nums=[1,0,0,2,3]"),
        (4, [1,2,3], [1,2,3], "nums=[1,2,3]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            arr = nums[:]
            sol.moveZeroes(arr)
            passed = arr == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(arr)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 5. 盛最多水的容器 ───────────────────────────────────
{
  id: 5, lcid: 11, title: "盛最多水的容器", difficulty: "中等",
  tags: ["数组", "双指针", "贪心"],
  description: `给定一个长度为 \`n\` 的整数数组 \`height\`，有 \`n\` 条垂线，第 \`i\` 条线的两个端点是 \`(i, 0)\` 和 \`(i, height[i])\`。

找出其中的两条线，使得它们与 \`x\` 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。

**提示：** 使用双指针，每次移动较短的那条线。`,
  examples: [
    { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
    { input: "height = [1,1]", output: "1" },
  ],
  template: `class Solution:
    def maxArea(self, height):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [1,8,6,2,5,4,8,3,7], 49, "height=[1,8,6,2,5,4,8,3,7]"),
        (2, [1,1], 1, "height=[1,1]"),
        (3, [4,3,2,1,4], 16, "height=[4,3,2,1,4]"),
        (4, [1,2,1], 2, "height=[1,2,1]"),
    ]
    results = []
    for no, h, expected, inp in cases:
        try:
            out = sol.maxArea(h[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 6. 三数之和 ──────────────────────────────────────
{
  id: 6, lcid: 15, title: "三数之和", difficulty: "中等",
  tags: ["数组", "双指针", "排序"],
  description: `给你一个整数数组 \`nums\`，判断是否存在三元组 \`[nums[i], nums[j], nums[k]]\` 满足 \`i != j\`、\`i != k\` 且 \`j != k\`，同时还满足 \`nums[i] + nums[j] + nums[k] == 0\`。

请你返回所有和为 0 且**不重复**的三元组。

**注意：** 答案中不可以包含重复的三元组。`,
  examples: [
    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
    { input: "nums = [0,1,1]", output: "[]" },
    { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
  ],
  template: `class Solution:
    def threeSum(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    def norm(res):
        return sorted([sorted(t) for t in res])
    cases = [
        (1, [-1,0,1,2,-1,-4], [[-1,-1,2],[-1,0,1]], "nums=[-1,0,1,2,-1,-4]"),
        (2, [0,1,1], [], "nums=[0,1,1]"),
        (3, [0,0,0], [[0,0,0]], "nums=[0,0,0]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.threeSum(nums[:])
            passed = norm(out) == norm(expected)
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 7. 接雨水 ───────────────────────────────────────
{
  id: 7, lcid: 42, title: "接雨水", difficulty: "困难",
  tags: ["数组", "双指针", "动态规划", "单调栈"],
  description: `给定 \`n\` 个非负整数表示每个宽度为 \`1\` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。`,
  examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
    { input: "height = [4,2,0,3,2,5]", output: "9" },
  ],
  template: `class Solution:
    def trap(self, height):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [0,1,0,2,1,0,1,3,2,1,2,1], 6, "height=[0,1,0,2,1,0,1,3,2,1,2,1]"),
        (2, [4,2,0,3,2,5], 9, "height=[4,2,0,3,2,5]"),
        (3, [1,0,1], 1, "height=[1,0,1]"),
        (4, [3,0,2,0,4], 7, "height=[3,0,2,0,4]"),
    ]
    results = []
    for no, h, expected, inp in cases:
        try:
            out = sol.trap(h[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 8. 无重复字符的最长子串 ────────────────────────────────
{
  id: 8, lcid: 3, title: "无重复字符的最长子串", difficulty: "中等",
  tags: ["哈希表", "字符串", "滑动窗口"],
  description: `给定一个字符串 \`s\`，请你找出其中不含有重复字符的**最长子串**的长度。`,
  examples: [
    { input: 's = "abcabcbb"', output: "3", explanation: '最长子串为 "abc"，长度为 3' },
    { input: 's = "bbbbb"', output: "1", explanation: '最长子串为 "b"，长度为 1' },
    { input: 's = "pwwkew"', output: "3", explanation: '最长子串为 "wke"，长度为 3' },
  ],
  template: `class Solution:
    def lengthOfLongestSubstring(self, s):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "abcabcbb", 3, 's="abcabcbb"'),
        (2, "bbbbb", 1, 's="bbbbb"'),
        (3, "pwwkew", 3, 's="pwwkew"'),
        (4, "", 0, 's=""'),
        (5, "au", 2, 's="au"'),
    ]
    results = []
    for no, s, expected, inp in cases:
        try:
            out = sol.lengthOfLongestSubstring(s)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 9. 找到字符串中所有字母异位词 ─────────────────────────────
{
  id: 9, lcid: 438, title: "找到字符串中所有字母异位词", difficulty: "中等",
  tags: ["字符串", "滑动窗口", "哈希表"],
  description: `给定两个字符串 \`s\` 和 \`p\`，找到 \`s\` 中所有 \`p\` 的**字母异位词**的子串，返回这些子串的**起始索引**。`,
  examples: [
    { input: 's = "cbaebabacd", p = "abc"', output: "[0,6]" },
    { input: 's = "abab", p = "ab"', output: "[0,1,2]" },
  ],
  template: `class Solution:
    def findAnagrams(self, s, p):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "cbaebabacd", "abc", [0,6], 's="cbaebabacd",p="abc"'),
        (2, "abab", "ab", [0,1,2], 's="abab",p="ab"'),
        (3, "aa", "bb", [], 's="aa",p="bb"'),
    ]
    results = []
    for no, s, p, expected, inp in cases:
        try:
            out = sol.findAnagrams(s, p)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 10. 和为 K 的子数组 ────────────────────────────────
{
  id: 10, lcid: 560, title: "和为 K 的子数组", difficulty: "中等",
  tags: ["数组", "哈希表", "前缀和"],
  description: `给你一个整数数组 \`nums\` 和一个整数 \`k\`，请你统计并返回该数组中**和为 \`k\` 的连续子数组的个数**。`,
  examples: [
    { input: "nums = [1,1,1], k = 2", output: "2" },
    { input: "nums = [1,2,3], k = 3", output: "2" },
  ],
  template: `class Solution:
    def subarraySum(self, nums, k):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,1,1], 2, 2, "nums=[1,1,1], k=2"),
        (2, [1,2,3], 3, 2, "nums=[1,2,3], k=3"),
        (3, [1], 0, 0, "nums=[1], k=0"),
        (4, [-1,-1,1], 0, 1, "nums=[-1,-1,1], k=0"),
    ]
    results = []
    for no, nums, k, expected, inp in cases:
        try:
            out = sol.subarraySum(nums[:], k)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 11. 滑动窗口最大值 ──────────────────────────────────
{
  id: 11, lcid: 239, title: "滑动窗口最大值", difficulty: "困难",
  tags: ["数组", "滑动窗口", "单调队列"],
  description: `给你一个整数数组 \`nums\`，有一个大小为 \`k\` 的滑动窗口从数组的最左侧移动到最右侧，每次只能移动一位。返回**每个窗口的最大值**组成的数组。`,
  examples: [
    { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
    { input: "nums = [1], k = 1", output: "[1]" },
  ],
  template: `class Solution:
    def maxSlidingWindow(self, nums, k):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,3,-1,-3,5,3,6,7], 3, [3,3,5,5,6,7], "nums=[1,3,-1,-3,5,3,6,7],k=3"),
        (2, [1], 1, [1], "nums=[1],k=1"),
        (3, [1,-1], 1, [1,-1], "nums=[1,-1],k=1"),
        (4, [9,11], 2, [11], "nums=[9,11],k=2"),
    ]
    results = []
    for no, nums, k, expected, inp in cases:
        try:
            out = sol.maxSlidingWindow(nums[:], k)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 12. 最小覆盖子串 ───────────────────────────────────
{
  id: 12, lcid: 76, title: "最小覆盖子串", difficulty: "困难",
  tags: ["字符串", "滑动窗口", "哈希表"],
  description: `给你一个字符串 \`s\` 和字符串 \`t\`，请你在 \`s\` 中找到包含 \`t\` 所有字符的**最小子串**。如果不存在返回 \`""\`。`,
  examples: [
    { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
    { input: 's = "a", t = "a"', output: '"a"' },
    { input: 's = "a", t = "aa"', output: '""' },
  ],
  template: `class Solution:
    def minWindow(self, s, t):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "ADOBECODEBANC", "ABC", "BANC", 's="ADOBECODEBANC",t="ABC"'),
        (2, "a", "a", "a", 's="a",t="a"'),
        (3, "a", "aa", "", 's="a",t="aa"'),
        (4, "bba", "ab", "ba", 's="bba",t="ab"'),
    ]
    results = []
    for no, s, t, expected, inp in cases:
        try:
            out = sol.minWindow(s, t)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":repr(expected),"output":repr(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 13. 最大子数组和 ───────────────────────────────────
{
  id: 13, lcid: 53, title: "最大子数组和", difficulty: "中等",
  tags: ["数组", "动态规划", "分治"],
  description: `给你一个整数数组 \`nums\`，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

**经典算法：** Kadane 算法，时间复杂度 O(n)。`,
  examples: [
    { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "子数组 [4,-1,2,1] 的和最大，为 6" },
    { input: "nums = [1]", output: "1" },
    { input: "nums = [5,4,-1,7,8]", output: "23" },
  ],
  template: `class Solution:
    def maxSubArray(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [-2,1,-3,4,-1,2,1,-5,4], 6, "nums=[-2,1,-3,4,-1,2,1,-5,4]"),
        (2, [1], 1, "nums=[1]"),
        (3, [5,4,-1,7,8], 23, "nums=[5,4,-1,7,8]"),
        (4, [-1], -1, "nums=[-1]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.maxSubArray(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 14. 合并区间 ─────────────────────────────────────
{
  id: 14, lcid: 56, title: "合并区间", difficulty: "中等",
  tags: ["数组", "排序"],
  description: `以数组 \`intervals\` 表示若干个区间的集合，其中 \`intervals[i] = [starti, endi]\`。请合并所有**重叠的区间**，返回不重叠的区间数组。`,
  examples: [
    { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
  ],
  template: `class Solution:
    def merge(self, intervals):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]], "4区间"),
        (2, [[1,4],[4,5]], [[1,5]], "相邻区间"),
        (3, [[1,4],[2,3]], [[1,4]], "包含区间"),
        (4, [[1,2]], [[1,2]], "单区间"),
    ]
    results = []
    for no, ivs, expected, inp in cases:
        try:
            out = sol.merge([iv[:] for iv in ivs])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 15. 轮转数组 ─────────────────────────────────────
{
  id: 15, lcid: 189, title: "轮转数组", difficulty: "中等",
  tags: ["数组", "双指针", "数学"],
  description: `给定一个整数数组 \`nums\`，将数组中的元素向右轮转 \`k\` 个位置，其中 \`k\` 是非负数。请**原地**修改数组，不额外使用数组。**技巧：** 三次翻转 — 全部翻转 → 前k个翻转 → 剩余翻转。`,
  examples: [
    { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" },
    { input: "nums = [-1,-100,3,99], k = 2", output: "[3,99,-1,-100]" },
  ],
  template: `class Solution:
    def rotate(self, nums, k):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [1,2,3,4,5,6,7], 3, [5,6,7,1,2,3,4], "k=3"),
        (2, [-1,-100,3,99], 2, [3,99,-1,-100], "k=2"),
        (3, [1,2], 3, [2,1], "k超出长度"),
        (4, [1,2,3], 0, [1,2,3], "k=0"),
    ]
    results = []
    for no, nums, k, expected, inp in cases:
        try:
            arr = nums[:]
            sol.rotate(arr, k)
            passed = arr == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(arr)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 16. 除自身以外数组的乘积 ───────────────────────────────
{
  id: 16, lcid: 238, title: "除自身以外数组的乘积", difficulty: "中等",
  tags: ["数组", "前缀和"],
  description: `给你一个整数数组 \`nums\`，返回数组 \`answer\`，其中 \`answer[i]\` 等于 \`nums\` 中除 \`nums[i]\` 之外其余各元素的乘积。**要求：** 不能使用除法，时间复杂度 O(n)。`,
  examples: [
    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
    { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
  ],
  template: `class Solution:
    def productExceptSelf(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,2,3,4], [24,12,8,6], "nums=[1,2,3,4]"),
        (2, [-1,1,0,-3,3], [0,0,9,0,0], "nums=[-1,1,0,-3,3]"),
        (3, [2,3], [3,2], "nums=[2,3]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.productExceptSelf(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 17. 缺失的第一个正数 ─────────────────────────────────
{
  id: 17, lcid: 41, title: "缺失的第一个正数", difficulty: "困难",
  tags: ["数组", "哈希表"],
  description: `给你一个未排序的整数数组 \`nums\`，请你找出其中没有出现的最小的正整数。请你实现时间复杂度为 \`O(n)\` 并且只使用常数级别额外空间的解决方案。**技巧：** 将每个正整数 x（1≤x≤n）放到下标 x-1 处（原地哈希）。`,
  examples: [
    { input: "nums = [1,2,0]", output: "3" },
    { input: "nums = [3,4,-1,1]", output: "2" },
    { input: "nums = [7,8,9,11,12]", output: "1" },
  ],
  template: `class Solution:
    def firstMissingPositive(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [1,2,0], 3, "nums=[1,2,0]"),
        (2, [3,4,-1,1], 2, "nums=[3,4,-1,1]"),
        (3, [7,8,9,11,12], 1, "nums=[7,8,9,11,12]"),
        (4, [1], 2, "nums=[1]"),
        (5, [2,1], 3, "nums=[2,1]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.firstMissingPositive(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 18. 矩阵置零 ─────────────────────────────────────
{
  id: 18, lcid: 73, title: "矩阵置零", difficulty: "中等",
  tags: ["数组", "矩阵", "哈希表"],
  description: `给定一个 \`m x n\` 的整数矩阵 \`matrix\`，如果一个元素为 \`0\`，则将其所在**行和列**的所有元素都设为 \`0\`。请使用**原地**算法。**进阶：** 用 O(1) 空间，将第一行/列作为标记数组。`,
  examples: [
    { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
    { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]" },
  ],
  template: `class Solution:
    def setZeroes(self, matrix):`,
  setup_code: `
import copy
def _run_tests(sol):
    cases = [
        (1, [[1,1,1],[1,0,1],[1,1,1]], [[1,0,1],[0,0,0],[1,0,1]], "含1个零"),
        (2, [[0,1,2,0],[3,4,5,2],[1,3,1,5]], [[0,0,0,0],[0,4,5,0],[0,3,1,0]], "含2个零"),
        (3, [[1]], [[1]], "无零"),
        (4, [[0]], [[0]], "全零"),
    ]
    results = []
    for no, matrix, expected, inp in cases:
        try:
            m = copy.deepcopy(matrix)
            sol.setZeroes(m)
            passed = m == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(m)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 19. 螺旋矩阵 ─────────────────────────────────────
{
  id: 19, lcid: 54, title: "螺旋矩阵", difficulty: "中等",
  tags: ["数组", "矩阵", "模拟"],
  description: `给你一个 \`m\` 行 \`n\` 列的矩阵 \`matrix\`，按照**顺时针螺旋顺序**，返回矩阵中的所有元素。`,
  examples: [
    { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
    { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
  ],
  template: `class Solution:
    def spiralOrder(self, matrix):`,
  setup_code: `
def _run_tests(sol):
    import copy
    cases = [
        (1, [[1,2,3],[4,5,6],[7,8,9]], [1,2,3,6,9,8,7,4,5], "3x3"),
        (2, [[1,2,3,4],[5,6,7,8],[9,10,11,12]], [1,2,3,4,8,12,11,10,9,5,6,7], "3x4"),
        (3, [[1]], [1], "1x1"),
        (4, [[1,2],[3,4]], [1,2,4,3], "2x2"),
    ]
    results = []
    for no, matrix, expected, inp in cases:
        try:
            out = sol.spiralOrder(copy.deepcopy(matrix))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 20. 旋转图像 ─────────────────────────────────────
{
  id: 20, lcid: 48, title: "旋转图像", difficulty: "中等",
  tags: ["数组", "矩阵", "数学"],
  description: `给定一个 \`n × n\` 的二维矩阵 \`matrix\`，请你将图像**顺时针旋转 90 度**，必须**原地**旋转，不能使用额外矩阵。**技巧：** 先沿主对角线转置，再左右翻转。`,
  examples: [
    { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
    { input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" },
  ],
  template: `class Solution:
    def rotate(self, matrix):`,
  setup_code: `
import copy
def _run_tests(sol):
    cases = [
        (1, [[1,2,3],[4,5,6],[7,8,9]], [[7,4,1],[8,5,2],[9,6,3]], "3x3"),
        (2, [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]], [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]], "4x4"),
        (3, [[1]], [[1]], "1x1"),
    ]
    results = []
    for no, matrix, expected, inp in cases:
        try:
            m = copy.deepcopy(matrix)
            sol.rotate(m)
            passed = m == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(m)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 21. 搜索二维矩阵 II ────────────────────────────────
{
  id: 21, lcid: 240, title: "搜索二维矩阵 II", difficulty: "中等",
  tags: ["数组", "二分查找", "矩阵", "分治"],
  description: `编写高效算法搜索 \`m × n\` 矩阵 \`matrix\` 中的目标值 \`target\`。矩阵特性：每行从左到右升序，每列从上到下升序。`,
  examples: [
    { input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],...], target = 5", output: "true" },
    { input: "target = 20", output: "false" },
  ],
  template: `class Solution:
    def searchMatrix(self, matrix, target):`,
  setup_code: `
def _run_tests(sol):
    m = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
    cases = [
        (1, m, 5, True, "target=5"),
        (2, m, 20, False, "target=20"),
        (3, m, 1, True, "左上角"),
        (4, m, 30, True, "右下角"),
        (5, [[1,1]], 0, False, "不存在"),
    ]
    results = []
    for no, matrix, target, expected, inp in cases:
        try:
            out = sol.searchMatrix([r[:] for r in matrix], target)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 22. 相交链表 ─────────────────────────────────────
{
  id: 22, lcid: 160, title: "相交链表", difficulty: "简单",
  tags: ["链表", "双指针", "哈希表"],
  description: `给你两个单链表的头节点 \`headA\` 和 \`headB\`，找出并返回两个单链表**相交的起始节点**。如果不相交，返回 \`null\`。`,
  examples: [
    { input: "listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]", output: "相交于节点 8" },
    { input: "不相交", output: "null" },
  ],
  template: `class Solution:
    def getIntersectionNode(self, headA, headB):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _run_tests(sol):
    # 构造相交链表
    shared = ListNode(8); shared.next = ListNode(4); shared.next.next = ListNode(5)
    a = ListNode(4); a.next = ListNode(1); a.next.next = shared
    b = ListNode(5); b.next = ListNode(6); b.next.next = ListNode(1); b.next.next.next = shared
    # 不相交
    c = ListNode(1); c.next = ListNode(3)
    d = ListNode(2)
    cases = [
        (1, a, b, 8, "相交于8"),
        (2, c, d, None, "不相交"),
    ]
    results = []
    for no, hA, hB, expected_val, inp in cases:
        try:
            out = sol.getIntersectionNode(hA, hB)
            out_val = out.val if out else None
            passed = out_val == expected_val
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected_val),"output":str(out_val)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 23. 反转链表 ─────────────────────────────────────
{
  id: 23, lcid: 206, title: "反转链表", difficulty: "简单",
  tags: ["链表", "递归"],
  description: `给你单链表的头节点 \`head\`，请你反转链表，并返回反转后的链表。`,
  examples: [
    { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
    { input: "head = [1,2]", output: "[2,1]" },
    { input: "head = []", output: "[]" },
  ],
  template: `class Solution:
    def reverseList(self, head):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h

def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r

def _run_tests(sol):
    from typing import Optional
    cases = [
        (1, [1,2,3,4,5], [5,4,3,2,1], "head=[1,2,3,4,5]"),
        (2, [1,2], [2,1], "head=[1,2]"),
        (3, [], [], "head=[]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = _to(sol.reverseList(_mk(arr)))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 24. 回文链表 ─────────────────────────────────────
{
  id: 24, lcid: 234, title: "回文链表", difficulty: "简单",
  tags: ["链表", "双指针", "栈"],
  description: `给你单链表的头节点 \`head\`，判断该链表是否为**回文链表**。要求 O(n) 时间，O(1) 空间。`,
  examples: [
    { input: "head = [1,2,2,1]", output: "true" },
    { input: "head = [1,2]", output: "false" },
  ],
  template: `class Solution:
    def isPalindrome(self, head):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _run_tests(sol):
    cases = [
        (1, [1,2,2,1], True, "[1,2,2,1]"),
        (2, [1,2], False, "[1,2]"),
        (3, [1], True, "[1]"),
        (4, [1,2,1], True, "[1,2,1]"),
        (5, [1,2,3,2,1], True, "[1,2,3,2,1]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.isPalindrome(_mk(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 25. 环形链表 ─────────────────────────────────────
{
  id: 25, lcid: 141, title: "环形链表", difficulty: "简单",
  tags: ["链表", "双指针", "哈希表"],
  description: `给你链表的头节点 \`head\`，判断链表中是否有**环**（要求 O(1) 内存，用快慢指针）。`,
  examples: [
    { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "尾连到第2个节点" },
    { input: "head = [1,2], pos = 0", output: "true" },
    { input: "head = [1], pos = -1", output: "false" },
  ],
  template: `class Solution:
    def hasCycle(self, head):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk_cycle(arr, pos):
    if not arr: return None
    nodes = [ListNode(v) for v in arr]
    for i in range(len(nodes)-1): nodes[i].next = nodes[i+1]
    if pos >= 0: nodes[-1].next = nodes[pos]
    return nodes[0]
def _run_tests(sol):
    cases = [
        (1, [3,2,0,-4], 1, True, "pos=1"),
        (2, [1,2], 0, True, "pos=0"),
        (3, [1], -1, False, "无环"),
        (4, [1,2,3], -1, False, "3节点无环"),
    ]
    results = []
    for no, arr, pos, expected, inp in cases:
        try:
            out = sol.hasCycle(_mk_cycle(arr, pos))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 26. 环形链表 II ──────────────────────────────────
{
  id: 26, lcid: 142, title: "环形链表 II", difficulty: "中等",
  tags: ["链表", "双指针", "哈希表"],
  description: `给定链表的头节点 \`head\`，返回链表**开始入环的第一个节点**。如果无环，返回 \`null\`。**进阶：** 使用 O(1) 空间的 Floyd 判圈算法（快慢指针）。`,
  examples: [
    { input: "head = [3,2,0,-4], pos = 1", output: "下标为 1 的节点（val=2）", explanation: "链表尾部连接到第 1 个节点" },
    { input: "head = [1,2], pos = 0", output: "下标为 0 的节点（val=1）" },
    { input: "head = [1], pos = -1", output: "null" },
  ],
  template: `class Solution:
    def detectCycle(self, head):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk_cycle(arr, pos):
    if not arr: return None, None
    nodes = [ListNode(v) for v in arr]
    for i in range(len(nodes)-1): nodes[i].next = nodes[i+1]
    entry = nodes[pos] if pos >= 0 else None
    if pos >= 0: nodes[-1].next = nodes[pos]
    return nodes[0], entry
def _run_tests(sol):
    cases = [
        (1, [3,2,0,-4], 1, "pos=1"),
        (2, [1,2], 0, "pos=0"),
        (3, [1], -1, "无环"),
    ]
    results = []
    for no, arr, pos, inp in cases:
        try:
            head, expected_node = _mk_cycle(arr, pos)
            out = sol.detectCycle(head)
            passed = out is expected_node
            ev = expected_node.val if expected_node else None
            ov = out.val if out else None
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(ev),"output":str(ov)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 27. 合并两个有序链表 ─────────────────────────────────
{
  id: 27, lcid: 21, title: "合并两个有序链表", difficulty: "简单",
  tags: ["链表", "递归"],
  description: `将两个升序链表合并为一个新的**升序**链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。`,
  examples: [
    { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
    { input: "list1 = [], list2 = []", output: "[]" },
    { input: "list1 = [], list2 = [0]", output: "[0]" },
  ],
  template: `class Solution:
    def mergeTwoLists(self, list1, list2):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    cases = [
        (1, [1,2,4], [1,3,4], [1,1,2,3,4,4], "list1=[1,2,4], list2=[1,3,4]"),
        (2, [], [], [], "list1=[], list2=[]"),
        (3, [], [0], [0], "list1=[], list2=[0]"),
        (4, [1], [2], [1,2], "list1=[1], list2=[2]"),
    ]
    results = []
    for no, l1, l2, expected, inp in cases:
        try:
            out = _to(sol.mergeTwoLists(_mk(l1), _mk(l2)))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 28. 两数相加 ─────────────────────────────────────
{
  id: 28, lcid: 2, title: "两数相加", difficulty: "中等",
  tags: ["链表", "数学"],
  description: `给你两个**非空**链表，分别表示两个非负整数，每位数字按**逆序**存储，每个节点存一位数字。将两数相加，返回表示和的链表。`,
  examples: [
    { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807" },
    { input: "l1 = [0], l2 = [0]", output: "[0]" },
    { input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]", output: "[8,9,9,9,0,0,0,1]" },
  ],
  template: `class Solution:
    def addTwoNumbers(self, l1, l2):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    cases = [
        (1, [2,4,3], [5,6,4], [7,0,8], "342+465"),
        (2, [0], [0], [0], "0+0"),
        (3, [9,9,9,9,9,9,9], [9,9,9,9], [8,9,9,9,0,0,0,1], "大数"),
    ]
    results = []
    for no, a, b, expected, inp in cases:
        try:
            out = _to(sol.addTwoNumbers(_mk(a), _mk(b)))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 29. 删除链表的倒数第N个节点 ─────────────────────────────
{
  id: 29, lcid: 19, title: "删除链表的倒数第N个节点", difficulty: "中等",
  tags: ["链表", "双指针"],
  description: `给你一个链表，删除链表的**倒数第 n 个**节点，并且返回链表的头节点（一次遍历完成）。`,
  examples: [
    { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
    { input: "head = [1], n = 1", output: "[]" },
    { input: "head = [1,2], n = 1", output: "[1]" },
  ],
  template: `class Solution:
    def removeNthFromEnd(self, head, n):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    cases = [
        (1, [1,2,3,4,5], 2, [1,2,3,5], "n=2"),
        (2, [1], 1, [], "单节点"),
        (3, [1,2], 1, [1], "删尾"),
        (4, [1,2], 2, [2], "删头"),
    ]
    results = []
    for no, arr, n, expected, inp in cases:
        try:
            out = _to(sol.removeNthFromEnd(_mk(arr), n))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 30. 两两交换链表中的节点 ───────────────────────────────
{
  id: 30, lcid: 24, title: "两两交换链表中的节点", difficulty: "中等",
  tags: ["链表", "递归"],
  description: `给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。`,
  examples: [
    { input: "head = [1,2,3,4]", output: "[2,1,4,3]" },
    { input: "head = []", output: "[]" },
    { input: "head = [1]", output: "[1]" },
  ],
  template: `class Solution:
    def swapPairs(self, head):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    from typing import Optional
    cases = [
        (1, [1,2,3,4], [2,1,4,3], "head=[1,2,3,4]"),
        (2, [], [], "head=[]"),
        (3, [1], [1], "head=[1]"),
        (4, [1,2,3], [2,1,3], "head=[1,2,3]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = _to(sol.swapPairs(_mk(arr)))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 31. K 个一组翻转链表 ────────────────────────────────
{
  id: 31, lcid: 25, title: "K 个一组翻转链表", difficulty: "困难",
  tags: ["链表", "递归"],
  description: `给你链表的头节点 \`head\`，每 \`k\` 个节点一组进行翻转，请你返回修改后的链表。\`k\` 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 \`k\` 的整数倍，那么请将最后剩余的节点保持原有顺序。`,
  examples: [
    { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
    { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" },
  ],
  template: `class Solution:
    def reverseKGroup(self, head, k):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    from typing import Optional
    cases = [
        (1, [1,2,3,4,5], 2, [2,1,4,3,5], "k=2"),
        (2, [1,2,3,4,5], 3, [3,2,1,4,5], "k=3"),
        (3, [1,2,3,4,5], 1, [1,2,3,4,5], "k=1"),
        (4, [1], 1, [1], "单节点"),
    ]
    results = []
    for no, arr, k, expected, inp in cases:
        try:
            out = _to(sol.reverseKGroup(_mk(arr), k))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 32. 随机链表的复制 ──────────────────────────────────
{
  id: 32, lcid: 138, title: "随机链表的复制", difficulty: "中等",
  tags: ["链表", "哈希表"],
  description: `给你一个长度为 \`n\` 的链表，每个节点包含一个额外增加的随机指针 \`random\`，该指针可以指向链表中任何节点或空节点。构造这个链表的**深拷贝**。深拷贝应该正好由 \`n\` 个全新节点组成，新节点的值与原节点值一致，新节点的指针不应指向原链表中的任何节点。`,
  examples: [
    { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" },
    { input: "head = [[1,1],[2,1]]", output: "[[1,1],[2,1]]" },
  ],
  template: `class Solution:
    def copyRandomList(self, head):`,
  setup_code: `
class Node:
    def __init__(self, x, next=None, random=None):
        self.val = x; self.next = next; self.random = random
def _mk(arr):
    if not arr: return None
    nodes = [Node(v) for v, _ in arr]
    for i in range(len(nodes)-1): nodes[i].next = nodes[i+1]
    for i, (_, r) in enumerate(arr):
        if r is not None: nodes[i].random = nodes[r]
    return nodes[0]
def _to(head):
    r = []
    while head:
        ri = None
        # find index of random
        if head.random:
            # traverse from head to find index
            h2 = head; tmp = head.random; idx = 0
            while h2 and h2 is not tmp:
                h2 = h2.next; idx += 1
            if h2: ri = idx
        r.append((head.val, ri)); head = head.next
    return r
def _run_tests(sol):
    cases = [
        (1, [[7,None],[13,0],[11,4],[10,2],[1,0]], "5节点"),
        (2, [[1,1],[2,1]], "2节点"),
        (3, [[3,None],[3,0],[3,None]], "3节点"),
    ]
    results = []
    for no, arr, inp in cases:
        try:
            orig = _mk(arr)
            copy_head = sol.copyRandomList(orig)
            # verify deep copy: same values, no shared nodes
            o, c = orig, copy_head
            ok = True
            while o and c:
                if o.val != c.val or o is c: ok = False; break
                o = o.next; c = c.next
            if o or c: ok = False
            results.append({"case":no,"passed":ok,"input":inp,"expected":"深拷贝正确","output":"ok" if ok else "fail"})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 33. 排序链表 ─────────────────────────────────────
{
  id: 33, lcid: 148, title: "排序链表", difficulty: "中等",
  tags: ["链表", "双指针", "排序", "分治"],
  description: `给你链表的头结点 \`head\`，请将链表按**升序**排列并返回排序后的链表。要求时间复杂度 O(n log n)，空间复杂度 O(1)。`,
  examples: [
    { input: "head = [4,2,1,3]", output: "[1,2,3,4]" },
    { input: "head = [-1,5,3,4,0]", output: "[-1,0,3,4,5]" },
  ],
  template: `class Solution:
    def sortList(self, head):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    cases = [
        (1, [4,2,1,3], [1,2,3,4], "[4,2,1,3]"),
        (2, [-1,5,3,4,0], [-1,0,3,4,5], "含负数"),
        (3, [], [], "空链表"),
        (4, [1], [1], "单节点"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = _to(sol.sortList(_mk(arr)))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 34. 合并 K 个升序链表 ───────────────────────────────
{
  id: 34, lcid: 23, title: "合并 K 个升序链表", difficulty: "困难",
  tags: ["链表", "堆", "分治"],
  description: `给你一个链表数组，每个链表都已经按升序排列。请你将所有链表**合并**到一个升序链表中，返回合并后的链表。`,
  examples: [
    { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    { input: "lists = []", output: "[]" },
    { input: "lists = [[]]", output: "[]" },
  ],
  template: `class Solution:
    def mergeKLists(self, lists):`,
  setup_code: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next
def _mk(arr):
    if not arr: return None
    h = ListNode(arr[0]); c = h
    for v in arr[1:]: c.next = ListNode(v); c = c.next
    return h
def _to(h):
    r = []
    while h: r.append(h.val); h = h.next
    return r
def _run_tests(sol):
    cases = [
        (1, [[1,4,5],[1,3,4],[2,6]], [1,1,2,3,4,4,5,6], "lists=[[1,4,5],[1,3,4],[2,6]]"),
        (2, [], [], "lists=[]"),
        (3, [[]], [], "lists=[[]]"),
        (4, [[1],[0]], [0,1], "lists=[[1],[0]]"),
    ]
    results = []
    for no, arrs, expected, inp in cases:
        try:
            out = _to(sol.mergeKLists([_mk(a) for a in arrs]))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 35. LRU 缓存 ───────────────────────────────────
{
  id: 35, lcid: 146, title: "LRU 缓存", difficulty: "中等",
  tags: ["设计", "哈希表", "链表"],
  description: `设计并实现满足 **LRU（最近最少使用）** 缓存约束的数据结构。\`get(key)\` 若存在返回值否则返回 \`-1\`；\`put(key,value)\` 插入/更新，满时逐出最久未使用的键。\`get\` 和 \`put\` 均须 O(1)。`,
  examples: [
    { input: '["LRUCache","put","put","get","put","get","put","get","get","get"] [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,null,-1,3,4]' },
  ],
  template: `class LRUCache:
    def __init__(self, capacity):
        ...
    def get(self, key):
        ...
    def put(self, key, value):
        ...`,
  setup_code: `
class Solution: pass
def _run_tests(_):
    results = []
    try:
        lru = LRUCache(2)
        lru.put(1,1); lru.put(2,2)
        r1 = lru.get(1)
        lru.put(3,3); r2 = lru.get(2)
        lru.put(4,4); r3 = lru.get(1); r4 = lru.get(3); r5 = lru.get(4)
        passed = r1==1 and r2==-1 and r3==-1 and r4==3 and r5==4
        results.append({"case":1,"passed":passed,"input":"capacity=2 标准序列","expected":"1,-1,-1,3,4","output":f"{r1},{r2},{r3},{r4},{r5}"})
    except Exception as e:
        results.append({"case":1,"passed":False,"input":"capacity=2","error":str(e)})
    try:
        lru = LRUCache(1)
        lru.put(2,1); lru.put(2,2); r1 = lru.get(2)
        lru.put(1,1); r2 = lru.get(2)
        passed = r1==2 and r2==-1
        results.append({"case":2,"passed":passed,"input":"capacity=1 更新已有key","expected":"2,-1","output":f"{r1},{r2}"})
    except Exception as e:
        results.append({"case":2,"passed":False,"input":"capacity=1","error":str(e)})
    return results
`
},

// ── 36. 二叉树的中序遍历 ─────────────────────────────────
{
  id: 36, lcid: 94, title: "二叉树的中序遍历", difficulty: "简单",
  tags: ["树", "深度优先搜索", "栈"],
  description: `给定一个二叉树的根节点 \`root\`，返回它的**中序遍历**结果（左 → 根 → 右）。**进阶：** 用迭代而非递归实现。`,
  examples: [
    { input: "root = [1,null,2,3]", output: "[1,3,2]" },
    { input: "root = []", output: "[]" },
    { input: "root = [1]", output: "[1]" },
  ],
  template: `class Solution:
    def inorderTraversal(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [1,None,2,3], [1,3,2], "root=[1,null,2,3]"),
        (2, [], [], "root=[]"),
        (3, [1], [1], "root=[1]"),
        (4, [1,2,3,4,5], [4,2,5,1,3], "root=[1,2,3,4,5]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.inorderTraversal(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 37. 二叉树的最大深度 ─────────────────────────────────
{
  id: 37, lcid: 104, title: "二叉树的最大深度", difficulty: "简单",
  tags: ["树", "深度优先搜索", "广度优先搜索"],
  description: `给定一个二叉树 \`root\`，返回其最大深度。

二叉树的**最大深度**是指从根节点到最远叶子节点的最长路径上的节点数。`,
  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "3" },
    { input: "root = [1,null,2]", output: "2" },
  ],
  template: `class Solution:
    def maxDepth(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root

def _run_tests(sol):
    from typing import Optional
    cases = [
        (1, [3,9,20,None,None,15,7], 3, "root=[3,9,20,null,null,15,7]"),
        (2, [1,None,2], 2, "root=[1,null,2]"),
        (3, [], 0, "root=[]"),
        (4, [1], 1, "root=[1]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.maxDepth(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 38. 翻转二叉树 ────────────────────────────────────
{
  id: 38, lcid: 226, title: "翻转二叉树", difficulty: "简单",
  tags: ["树", "深度优先搜索", "广度优先搜索"],
  description: `给你一棵二叉树的根节点 \`root\`，翻转这棵二叉树，并返回其根节点。

**翻转**意味着将每个节点的左右子树互换。`,
  examples: [
    { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
    { input: "root = [2,1,3]", output: "[2,3,1]" },
    { input: "root = []", output: "[]" },
  ],
  template: `class Solution:
    def invertTree(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root

def _tree_arr(root):
    if not root: return []
    from collections import deque
    res = []; q = deque([root])
    while q:
        node = q.popleft()
        if node:
            res.append(node.val); q.append(node.left); q.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None: res.pop()
    return res

def _run_tests(sol):
    from typing import Optional
    cases = [
        (1, [4,2,7,1,3,6,9], [4,7,2,9,6,3,1], "root=[4,2,7,1,3,6,9]"),
        (2, [2,1,3], [2,3,1], "root=[2,1,3]"),
        (3, [], [], "root=[]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = _tree_arr(sol.invertTree(_mkt(arr)))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 39. 对称二叉树 ────────────────────────────────────
{
  id: 39, lcid: 101, title: "对称二叉树", difficulty: "简单",
  tags: ["树", "深度优先搜索", "广度优先搜索"],
  description: `给你一个二叉树的根节点 \`root\`，检查它是否**轴对称**（镜像对称）。`,
  examples: [
    { input: "root = [1,2,2,3,4,4,3]", output: "true" },
    { input: "root = [1,2,2,null,3,null,3]", output: "false" },
  ],
  template: `class Solution:
    def isSymmetric(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [1,2,2,3,4,4,3], True, "root=[1,2,2,3,4,4,3]"),
        (2, [1,2,2,None,3,None,3], False, "root=[1,2,2,null,3,null,3]"),
        (3, [1], True, "root=[1]"),
        (4, [1,2,2,None,3,3,None], True, "root=[1,2,2,null,3,3,null]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.isSymmetric(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 40. 二叉树的直径 ───────────────────────────────────
{
  id: 40, lcid: 543, title: "二叉树的直径", difficulty: "简单",
  tags: ["树", "深度优先搜索"],
  description: `给你一棵二叉树的根节点，返回该树的**直径**（任意两节点之间最长路径的长度，路径可能不经过根节点）。`,
  examples: [
    { input: "root = [1,2,3,4,5]", output: "3", explanation: "路径 [4,2,1,3] 或 [5,2,1,3]" },
    { input: "root = [1,2]", output: "1" },
  ],
  template: `class Solution:
    def diameterOfBinaryTree(self, root):`,
  setup_code: `
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [1,2,3,4,5], 3, "[1,2,3,4,5]"),
        (2, [1,2], 1, "[1,2]"),
        (3, [1], 0, "单节点"),
        (4, [1,2,None,3,None,4,None,5], 4, "链状"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.diameterOfBinaryTree(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 41. 二叉树的层序遍历 ─────────────────────────────────
{
  id: 41, lcid: 102, title: "二叉树的层序遍历", difficulty: "中等",
  tags: ["树", "广度优先搜索"],
  description: `给你二叉树的根节点 \`root\`，返回其节点值的**层序遍历**结果（逐层从左到右访问所有节点）。`,
  examples: [
    { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    { input: "root = [1]", output: "[[1]]" },
    { input: "root = []", output: "[]" },
  ],
  template: `class Solution:
    def levelOrder(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [3,9,20,None,None,15,7], [[3],[9,20],[15,7]], "root=[3,9,20,null,null,15,7]"),
        (2, [1], [[1]], "root=[1]"),
        (3, [], [], "root=[]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.levelOrder(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 42. 将有序数组转换为二叉搜索树 ────────────────────────────
{
  id: 42, lcid: 108, title: "将有序数组转换为二叉搜索树", difficulty: "简单",
  tags: ["树", "二分查找", "分治"],
  description: `给你一个整数数组 \`nums\`，其中元素已经按**升序**排列，请你将其转换为一棵**高度平衡**二叉搜索树。高度平衡指每个节点的左右子树的高度差不超过 1。**方法：** 取中间元素为根，递归构建左右子树。`,
  examples: [
    { input: "nums = [-10,-3,0,5,9]", output: "[0,-3,9,-10,null,5]", explanation: "或 [0,-10,5,null,-3,null,9]" },
    { input: "nums = [1,3]", output: "[3,1]", explanation: "或 [1,null,3]" },
  ],
  template: `class Solution:
    def sortedArrayToBST(self, nums):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _check_bst(root, mn=float('-inf'), mx=float('inf')):
    if not root: return True
    if not (mn < root.val < mx): return False
    return _check_bst(root.left, mn, root.val) and _check_bst(root.right, root.val, mx)
def _height(root):
    if not root: return 0
    return 1 + max(_height(root.left), _height(root.right))
def _is_balanced(root):
    if not root: return True
    return abs(_height(root.left) - _height(root.right)) <= 1 and _is_balanced(root.left) and _is_balanced(root.right)
def _run_tests(sol):
    from typing import Optional, List
    cases = [
        (1, [-10,-3,0,5,9], "5个元素"),
        (2, [1,3], "2个元素"),
        (3, [1], "1个元素"),
        (4, list(range(7)), "7个元素"),
    ]
    results = []
    for no, nums, inp in cases:
        try:
            root = sol.sortedArrayToBST(nums[:])
            balanced = _is_balanced(root)
            is_bst = _check_bst(root)
            passed = balanced and is_bst
            results.append({"case":no,"passed":passed,"input":inp,"expected":"高度平衡BST","output":f"平衡:{balanced} BST:{is_bst}"})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 43. 验证二叉搜索树 ──────────────────────────────────
{
  id: 43, lcid: 98, title: "验证二叉搜索树", difficulty: "中等",
  tags: ["树", "深度优先搜索", "二分查找"],
  description: `给你一个二叉树的根节点 \`root\`，判断其是否为有效的**二叉搜索树**（BST）。BST 定义：左子树所有节点值 < 根节点值，右子树所有节点值 > 根节点值，且左右子树也分别为 BST。`,
  examples: [
    { input: "root = [2,1,3]", output: "true" },
    { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "右子节点 4 < 根 5" },
  ],
  template: `class Solution:
    def isValidBST(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [2,1,3], True, "root=[2,1,3]"),
        (2, [5,1,4,None,None,3,6], False, "root=[5,1,4,null,null,3,6]"),
        (3, [1], True, "root=[1]"),
        (4, [5,4,6,None,None,3,7], False, "右子左节点3<根5"),
        (5, [2,2,2], False, "等于不算BST"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.isValidBST(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 44. 二叉搜索树中第 K 小的元素 ───────────────────────────
{
  id: 44, lcid: 230, title: "二叉搜索树中第 K 小的元素", difficulty: "中等",
  tags: ["树", "深度优先搜索", "二叉搜索树"],
  description: `给定一个二叉搜索树的根节点 \`root\`，和一个整数 \`k\`，请你设计一个算法查找其中**第 k 小的元素**（从 1 开始计数）。**方法：** 中序遍历 BST 得到有序序列，返回第 k 个。`,
  examples: [
    { input: "root = [3,1,4,null,2], k = 1", output: "1" },
    { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" },
  ],
  template: `class Solution:
    def kthSmallest(self, root, k):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [3,1,4,None,2], 1, 1, "k=1"),
        (2, [5,3,6,2,4,None,None,1], 3, 3, "k=3"),
        (3, [2,1,3], 2, 2, "k=2"),
        (4, [1], 1, 1, "单节点"),
    ]
    results = []
    for no, arr, k, expected, inp in cases:
        try:
            out = sol.kthSmallest(_mkt(arr), k)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 45. 二叉树的右视图 ──────────────────────────────────
{
  id: 45, lcid: 199, title: "二叉树的右视图", difficulty: "中等",
  tags: ["树", "深度优先搜索", "广度优先搜索"],
  description: `给定一个二叉树的根节点 \`root\`，想象自己站在它的**右侧**，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。**方法：** BFS 每层取最后一个节点，或 DFS 优先遍历右子树。`,
  examples: [
    { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" },
    { input: "root = [1,null,3]", output: "[1,3]" },
    { input: "root = []", output: "[]" },
  ],
  template: `class Solution:
    def rightSideView(self, root):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    from collections import deque
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    from typing import Optional, List
    cases = [
        (1, [1,2,3,None,5,None,4], [1,3,4], "root=[1,2,3,null,5,null,4]"),
        (2, [1,None,3], [1,3], "root=[1,null,3]"),
        (3, [], [], "root=[]"),
        (4, [1,2,3,4], [1,3,4], "root=[1,2,3,4]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.rightSideView(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 46. 二叉树展开为链表 ─────────────────────────────────
{
  id: 46, lcid: 114, title: "二叉树展开为链表", difficulty: "中等",
  tags: ["树", "深度优先搜索", "链表"],
  description: `给你二叉树的根结点 \`root\`，请你将它**原地**展开为一个单链表（按前序遍历顺序，只使用右指针，左指针均置 null）。`,
  examples: [
    { input: "root = [1,2,5,3,4,null,6]", output: "[1,null,2,null,3,null,4,null,5,null,6]" },
    { input: "root = []", output: "[]" },
    { input: "root = [0]", output: "[0]" },
  ],
  template: `class Solution:
    def flatten(self, root):`,
  setup_code: `
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _to_list(root):
    r = []
    while root: r.append(root.val); root = root.right
    return r
def _run_tests(sol):
    cases = [
        (1, [1,2,5,3,4,None,6], [1,2,3,4,5,6], "[1,2,5,3,4,null,6]"),
        (2, [], [], "empty"),
        (3, [0], [0], "[0]"),
        (4, [1,2,3], [1,2,3], "[1,2,3]"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            root = _mkt(arr)
            sol.flatten(root)
            out = _to_list(root)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 47. 从前序与中序遍历序列构造二叉树 ──────────────────────────
{
  id: 47, lcid: 105, title: "从前序与中序遍历序列构造二叉树", difficulty: "中等",
  tags: ["树", "数组", "哈希表", "分治"],
  description: `给定两个整数数组 \`preorder\`（前序遍历）和 \`inorder\`（中序遍历），请构造对应二叉树并返回其根节点。`,
  examples: [
    { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" },
    { input: "preorder = [-1], inorder = [-1]", output: "[-1]" },
  ],
  template: `class Solution:
    def buildTree(self, preorder, inorder):`,
  setup_code: `
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _level(root):
    if not root: return []
    r, q = [], deque([root])
    while q:
        node = q.popleft()
        r.append(node.val if node else None)
        if node: q.append(node.left); q.append(node.right)
    while r and r[-1] is None: r.pop()
    return r
def _run_tests(sol):
    cases = [
        (1, [3,9,20,15,7], [9,3,15,20,7], [3,9,20,None,None,15,7], "5节点"),
        (2, [-1], [-1], [-1], "单节点"),
        (3, [1,2,3], [2,1,3], [1,2,3], "满树"),
    ]
    results = []
    for no, pre, ino, expected, inp in cases:
        try:
            out = _level(sol.buildTree(pre[:], ino[:]))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 48. 路径总和 III ─────────────────────────────────
{
  id: 48, lcid: 437, title: "路径总和 III", difficulty: "中等",
  tags: ["树", "深度优先搜索", "哈希表"],
  description: `给定二叉树根节点 \`root\` 和整数 \`targetSum\`，统计节点值之和等于 \`targetSum\` 的路径数目。路径方向**向下**，不需要从根节点开始或结束在叶节点。`,
  examples: [
    { input: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8", output: "3" },
    { input: "root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22", output: "3" },
  ],
  template: `class Solution:
    def pathSum(self, root, targetSum):`,
  setup_code: `
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [10,5,-3,3,2,None,11,3,-2,None,1], 8, 3, "经典例"),
        (2, [5,4,8,11,None,13,4,7,2,None,None,5,1], 22, 3, "第二例"),
        (3, [1,None,2,None,3,None,4,None,5], 3, 2, "链状"),
        (4, [1], 1, 1, "单节点"),
    ]
    results = []
    for no, arr, target, expected, inp in cases:
        try:
            out = sol.pathSum(_mkt(arr), target)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 49. 二叉树的最近公共祖先 ───────────────────────────────
{
  id: 49, lcid: 236, title: "二叉树的最近公共祖先", difficulty: "中等",
  tags: ["树", "深度优先搜索"],
  description: `给定一个二叉树，找到该树中两个指定节点的**最近公共祖先**（LCA）。LCA 定义：节点 x 是 p、q 的祖先且深度尽可能大（**一个节点也可以是它自己的祖先**）。`,
  examples: [
    { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" },
    { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4", output: "5" },
  ],
  template: `class Solution:
    def lowestCommonAncestor(self, root, p, q):`,
  setup_code: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None, {}
    from collections import deque
    r = TreeNode(arr[0]); q = deque([r]); i = 1; nd = {arr[0]: r}
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); nd[arr[i]] = node.left; q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); nd[arr[i]] = node.right; q.append(node.right)
        i += 1
    return r, nd
def _run_tests(sol):
    cases = [
        (1, [3,5,1,6,2,0,8,None,None,7,4], 5, 1, 3, "p=5,q=1"),
        (2, [3,5,1,6,2,0,8,None,None,7,4], 5, 4, 5, "p=5,q=4"),
        (3, [1,2], 1, 2, 1, "p=1,q=2"),
    ]
    results = []
    for no, arr, pv, qv, ev, inp in cases:
        try:
            root, nd = _mkt(arr)
            out = sol.lowestCommonAncestor(root, nd[pv], nd[qv])
            passed = out.val == ev
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(ev),"output":str(out.val)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 50. 二叉树中的最大路径和 ───────────────────────────────
{
  id: 50, lcid: 124, title: "二叉树中的最大路径和", difficulty: "困难",
  tags: ["树", "深度优先搜索", "动态规划"],
  description: `**路径**是由任意节点序列构成的序列，同一节点至多出现一次。给你二叉树根节点 \`root\`，返回其**最大路径和**（路径不必经过根节点）。`,
  examples: [
    { input: "root = [1,2,3]", output: "6", explanation: "2→1→3" },
    { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "15→20→7" },
  ],
  template: `class Solution:
    def maxPathSum(self, root):`,
  setup_code: `
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right
def _mkt(arr):
    if not arr: return None
    root = TreeNode(arr[0]); q = deque([root]); i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i]); q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i]); q.append(node.right)
        i += 1
    return root
def _run_tests(sol):
    cases = [
        (1, [1,2,3], 6, "[1,2,3]"),
        (2, [-10,9,20,None,None,15,7], 42, "[-10,9,20,null,null,15,7]"),
        (3, [-3], -3, "单负节点"),
        (4, [1,-2,-3,1,3,-2,None,-1], 3, "复杂树"),
    ]
    results = []
    for no, arr, expected, inp in cases:
        try:
            out = sol.maxPathSum(_mkt(arr))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 51. 岛屿数量 ─────────────────────────────────────
{
  id: 51, lcid: 200, title: "岛屿数量", difficulty: "中等",
  tags: ["图", "深度优先搜索", "广度优先搜索"],
  description: `给你一个由 \`'1'\`（陆地）和 \`'0'\`（水）组成的二维网格，请你计算网格中**岛屿的数量**。岛屿总是被水包围，且只能由水平/垂直方向相邻的陆地连接而成。`,
  examples: [
    { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],...]', output: "1" },
    { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
  ],
  template: `class Solution:
    def numIslands(self, grid):`,
  setup_code: `
import copy
def _run_tests(sol):
    cases = [
        (1, [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]], 1, "case1"),
        (2, [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]], 3, "case2"),
        (3, [["1"]], 1, "single land"),
        (4, [["0"]], 0, "single water"),
    ]
    results = []
    for no, grid, expected, inp in cases:
        try:
            out = sol.numIslands(copy.deepcopy(grid))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 52. 腐烂的橘子 ────────────────────────────────────
{
  id: 52, lcid: 994, title: "腐烂的橘子", difficulty: "中等",
  tags: ["图", "广度优先搜索", "矩阵"],
  description: `在给定的 \`m x n\` 网格 \`grid\` 中，每个单元格可以有以下三个值之一：值 \`0\` 代表空单元格；值 \`1\` 代表新鲜橘子；值 \`2\` 代表腐烂的橘子。每分钟，腐烂的橘子**周围 4 个方向**上相邻的新鲜橘子都会腐烂。返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数，如果不可能，返回 \`-1\`。`,
  examples: [
    { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" },
    { input: "grid = [[2,1,1],[0,1,1],[1,0,1]]", output: "-1" },
    { input: "grid = [[0,2]]", output: "0" },
  ],
  template: `class Solution:
    def orangesRotting(self, grid):`,
  setup_code: `
import copy
def _run_tests(sol):
    cases = [
        (1, [[2,1,1],[1,1,0],[0,1,1]], 4, "case1"),
        (2, [[2,1,1],[0,1,1],[1,0,1]], -1, "case2 不可能"),
        (3, [[0,2]], 0, "case3 无新鲜橘子"),
        (4, [[1]], -1, "孤立新鲜橘子"),
    ]
    results = []
    for no, grid, expected, inp in cases:
        try:
            out = sol.orangesRotting(copy.deepcopy(grid))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 53. 课程表 ──────────────────────────────────────
{
  id: 53, lcid: 207, title: "课程表", difficulty: "中等",
  tags: ["图", "拓扑排序", "深度优先搜索"],
  description: `你必须选修 \`numCourses\` 门课程（编号 0 到 numCourses-1）。\`prerequisites[i] = [ai, bi]\` 表示学习 \`ai\` 前必须先学 \`bi\`。请判断是否能完成所有课程的学习（即有向图是否无环）。`,
  examples: [
    { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
    { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
  ],
  template: `class Solution:
    def canFinish(self, numCourses, prerequisites):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, 2, [[1,0]], True, "numCourses=2, [[1,0]]"),
        (2, 2, [[1,0],[0,1]], False, "有环"),
        (3, 1, [], True, "单节点无边"),
        (4, 3, [[1,0],[2,1],[0,2]], False, "3节点成环"),
    ]
    results = []
    for no, n, pre, expected, inp in cases:
        try:
            out = sol.canFinish(n, [p[:] for p in pre])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 54. 实现 Trie（前缀树） ─────────────────────────────
{
  id: 54, lcid: 208, title: "实现 Trie（前缀树）", difficulty: "中等",
  tags: ["设计", "字典树", "哈希表", "字符串"],
  description: `实现 \`Trie\` 类：\`insert(word)\` 插入字符串，\`search(word)\` 返回是否存在完整单词，\`startsWith(prefix)\` 返回是否存在以该前缀开头的单词。`,
  examples: [
    { input: 'insert("apple"); search("apple") → true; search("app") → false; startsWith("app") → true; insert("app"); search("app") → true', output: "true/false/true/true" },
  ],
  template: `class Trie:
    def __init__(self): ...
    def insert(self, word): ...
    def search(self, word): ...
    def startsWith(self, prefix): ...`,
  setup_code: `
class Solution: pass
def _run_tests(sol):
    results = []
    try:
        t = Trie()
        t.insert("apple")
        r1 = t.search("apple")
        r2 = t.search("app")
        r3 = t.startsWith("app")
        t.insert("app")
        r4 = t.search("app")
        passed = r1 == True and r2 == False and r3 == True and r4 == True
        results.append({"case":1,"passed":passed,"input":"apple/app操作","expected":"T,F,T,T","output":f"{r1},{r2},{r3},{r4}"})
    except Exception as e:
        results.append({"case":1,"passed":False,"input":"基本操作","error":str(e)})
    try:
        t2 = Trie()
        t2.insert("a")
        r5 = t2.search("a"); r6 = t2.startsWith("b")
        passed2 = r5 == True and r6 == False
        results.append({"case":2,"passed":passed2,"input":"单字母","expected":"T,F","output":f"{r5},{r6}"})
    except Exception as e:
        results.append({"case":2,"passed":False,"input":"单字母","error":str(e)})
    return results
`
},

// ── 55. 全排列 ──────────────────────────────────────
{
  id: 55, lcid: 46, title: "全排列", difficulty: "中等",
  tags: ["数组", "回溯"],
  description: `给定一个不含重复数字的数组 \`nums\`，返回其**所有可能的全排列**。你可以按任意顺序返回答案。`,
  examples: [
    { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
    { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
    { input: "nums = [1]", output: "[[1]]" },
  ],
  template: `class Solution:
    def permute(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,2,3], [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], "nums=[1,2,3]"),
        (2, [0,1], [[0,1],[1,0]], "nums=[0,1]"),
        (3, [1], [[1]], "nums=[1]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.permute(nums[:])
            passed = sorted(map(tuple,out)) == sorted(map(tuple,expected))
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(len(expected))+"种","output":str(len(out))+"种 ok="+str(passed)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 56. 子集 ───────────────────────────────────────
{
  id: 56, lcid: 78, title: "子集", difficulty: "中等",
  tags: ["数组", "回溯", "位运算"],
  description: `给你一个整数数组 \`nums\`，元素**互不相同**。返回该数组所有可能的子集（幂集）。解集**不能**包含重复的子集。`,
  examples: [
    { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
    { input: "nums = [0]", output: "[[],[0]]" },
  ],
  template: `class Solution:
    def subsets(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,2,3], [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], "nums=[1,2,3]"),
        (2, [0], [[],[0]], "nums=[0]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.subsets(nums[:])
            norm = lambda x: sorted([sorted(s) for s in x])
            passed = norm(out) == norm(expected)
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(len(expected))+"个","output":str(len(out))+"个 ok="+str(passed)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 57. 电话号码的字母组合 ────────────────────────────────
{
  id: 57, lcid: 17, title: "电话号码的字母组合", difficulty: "中等",
  tags: ["字符串", "回溯", "哈希表"],
  description: `给定一个仅包含数字 \`2-9\` 的字符串，返回所有它能表示的字母组合（九宫格键盘映射）。答案可以按任意顺序返回。`,
  examples: [
    { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
    { input: 'digits = ""', output: "[]" },
    { input: 'digits = "2"', output: '["a","b","c"]' },
  ],
  template: `class Solution:
    def letterCombinations(self, digits):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "23", {"ad","ae","af","bd","be","bf","cd","ce","cf"}, 'digits="23"'),
        (2, "", set(), 'digits=""'),
        (3, "2", {"a","b","c"}, 'digits="2"'),
    ]
    results = []
    for no, d, expected, inp in cases:
        try:
            out = set(sol.letterCombinations(d) or [])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(sorted(expected)),"output":str(sorted(out))})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 58. 组合总和 ─────────────────────────────────────
{
  id: 58, lcid: 39, title: "组合总和", difficulty: "中等",
  tags: ["数组", "回溯"],
  description: `给你一个**无重复元素**的整数数组 \`candidates\` 和目标整数 \`target\`，找出所有可以使数字和为 \`target\` 的**不同组合**。\`candidates\` 中同一个数字可以**无限制重复选取**。`,
  examples: [
    { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" },
    { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    { input: "candidates = [2], target = 1", output: "[]" },
  ],
  template: `class Solution:
    def combinationSum(self, candidates, target):`,
  setup_code: `
def _run_tests(sol):
    norm = lambda x: sorted([sorted(s) for s in x])
    cases = [
        (1, [2,3,6,7], 7, [[2,2,3],[7]], "candidates=[2,3,6,7], target=7"),
        (2, [2,3,5], 8, [[2,2,2,2],[2,3,3],[3,5]], "candidates=[2,3,5], target=8"),
        (3, [2], 1, [], "candidates=[2], target=1"),
    ]
    results = []
    for no, cands, target, expected, inp in cases:
        try:
            out = sol.combinationSum(cands[:], target)
            passed = norm(out) == norm(expected)
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(norm(expected)),"output":str(norm(out))})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 59. 括号生成 ─────────────────────────────────────
{
  id: 59, lcid: 22, title: "括号生成", difficulty: "中等",
  tags: ["字符串", "回溯", "动态规划"],
  description: `数字 \`n\` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且**有效的**括号组合。`,
  examples: [
    { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' },
    { input: "n = 1", output: '["()"]' },
  ],
  template: `class Solution:
    def generateParenthesis(self, n):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, 3, ["((()))","(()())","(())()","()(())","()()()"], "n=3"),
        (2, 1, ["()"], "n=1"),
        (3, 2, ["(())","()()"], "n=2"),
    ]
    results = []
    for no, n, expected, inp in cases:
        try:
            out = sol.generateParenthesis(n)
            passed = sorted(out) == sorted(expected)
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(sorted(expected)),"output":str(sorted(out))})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 60. 单词搜索 ─────────────────────────────────────
{
  id: 60, lcid: 79, title: "单词搜索", difficulty: "中等",
  tags: ["数组", "回溯", "深度优先搜索"],
  description: `给定 \`m x n\` 的字符网格 \`board\` 和字符串 \`word\`，如果 \`word\` 存在于网格中返回 \`true\`（每个单元格只能使用一次，只能水平/垂直相邻）。`,
  examples: [
    { input: 'board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED"', output: "true" },
    { input: 'word="SEE"', output: "true" },
    { input: 'word="ABCB"', output: "false" },
  ],
  template: `class Solution:
    def exist(self, board, word):`,
  setup_code: `
import copy
def _run_tests(sol):
    board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    cases = [
        (1, board, "ABCCED", True, 'word="ABCCED"'),
        (2, board, "SEE", True, 'word="SEE"'),
        (3, board, "ABCB", False, 'word="ABCB"'),
        (4, [["a"]], "a", True, '1x1 match'),
        (5, [["a","b"],["c","d"]], "abdc", True, '2x2 snake'),
    ]
    results = []
    for no, b, word, expected, inp in cases:
        try:
            out = sol.exist(copy.deepcopy(b), word)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 61. 分割回文串 ────────────────────────────────────
{
  id: 61, lcid: 131, title: "分割回文串", difficulty: "中等",
  tags: ["字符串", "动态规划", "回溯"],
  description: `给你一个字符串 \`s\`，请你将 \`s\` 分割成一些子串，使每个子串都是**回文串**。返回 \`s\` 所有可能的分割方案。**方法：** 回溯 + 预处理 DP 判断回文。`,
  examples: [
    { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
    { input: 's = "a"', output: '[["a"]]' },
  ],
  template: `class Solution:
    def partition(self, s):`,
  setup_code: `
def _run_tests(sol):
    def norm(res): return sorted([tuple(x) for x in res])
    cases = [
        (1, "aab", [["a","a","b"],["aa","b"]], 's="aab"'),
        (2, "a", [["a"]], 's="a"'),
        (3, "aba", [["a","b","a"],["aba"]], 's="aba"'),
    ]
    results = []
    for no, s, expected, inp in cases:
        try:
            out = sol.partition(s)
            passed = norm(out) == norm(expected)
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(len(expected))+"种","output":str(len(out))+"种 ok="+str(passed)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 62. N 皇后 ─────────────────────────────────────
{
  id: 62, lcid: 51, title: "N 皇后", difficulty: "困难",
  tags: ["数组", "回溯"],
  description: `按照国际象棋的规则，皇后可以攻击与之处在同一行、列或斜线上的棋子。**n 皇后问题**研究如何将 \`n\` 个皇后放置在 \`n×n\` 的棋盘上，并且使皇后彼此之间不能相互攻击。给你一个整数 \`n\`，返回所有不同的 n 皇后问题的解决方案（每种方案中 'Q' 表示皇后，'.' 表示空位）。`,
  examples: [
    { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
    { input: "n = 1", output: '["Q"]' },
  ],
  template: `class Solution:
    def solveNQueens(self, n):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, 4, 2, "n=4 (2种解)"),
        (2, 1, 1, "n=1"),
        (3, 5, 10, "n=5 (10种解)"),
        (4, 6, 4, "n=6 (4种解)"),
    ]
    results = []
    for no, n, exp_count, inp in cases:
        try:
            out = sol.solveNQueens(n)
            passed = len(out) == exp_count
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(exp_count)+"种","output":str(len(out))+"种"})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 63. 搜索插入位置 ───────────────────────────────────
{
  id: 63, lcid: 35, title: "搜索插入位置", difficulty: "简单",
  tags: ["数组", "二分查找"],
  description: `给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。请必须使用时间复杂度为 \`O(log n)\` 的算法。`,
  examples: [
    { input: "nums = [1,3,5,6], target = 5", output: "2" },
    { input: "nums = [1,3,5,6], target = 2", output: "1" },
    { input: "nums = [1,3,5,6], target = 7", output: "4" },
  ],
  template: `class Solution:
    def searchInsert(self, nums, target):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,3,5,6], 5, 2, "target=5"),
        (2, [1,3,5,6], 2, 1, "target=2"),
        (3, [1,3,5,6], 7, 4, "target=7"),
        (4, [1,3,5,6], 0, 0, "target=0"),
        (5, [1], 0, 0, "单元素"),
    ]
    results = []
    for no, nums, target, expected, inp in cases:
        try:
            out = sol.searchInsert(nums[:], target)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 64. 搜索二维矩阵 ───────────────────────────────────
{
  id: 64, lcid: 74, title: "搜索二维矩阵", difficulty: "中等",
  tags: ["数组", "二分查找", "矩阵"],
  description: `给你一个满足下述两条属性的 \`m x n\` 整数矩阵：每行中的整数从左到右按非严格递增顺序排列；每行的第一个整数大于前一行的最后一个整数。给你一个整数 \`target\`，如果 \`target\` 在矩阵中，返回 \`true\`；否则，返回 \`false\`。`,
  examples: [
    { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
    { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" },
  ],
  template: `class Solution:
    def searchMatrix(self, matrix, target):`,
  setup_code: `
def _run_tests(sol):
    m = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    cases = [
        (1, m, 3, True, "target=3"),
        (2, m, 13, False, "target=13"),
        (3, [[1]], 1, True, "1x1 match"),
        (4, [[1]], 2, False, "1x1 miss"),
        (5, m, 1, True, "target=1 (左上角)"),
    ]
    results = []
    for no, matrix, target, expected, inp in cases:
        try:
            out = sol.searchMatrix(matrix, target)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 65. 查找第一个和最后一个位置 ─────────────────────────────
{
  id: 65, lcid: 34, title: "查找第一个和最后一个位置", difficulty: "中等",
  tags: ["数组", "二分查找"],
  description: `给你一个按照**非递减顺序**排列的整数数组 \`nums\` 和目标值 \`target\`，请你找出目标值在数组中的**开始位置和结束位置**。若不存在返回 \`[-1,-1]\`，时间复杂度须 O(log n)。`,
  examples: [
    { input: "nums = [5,7,7,8,8,10], target = 8", output: "[3,4]" },
    { input: "nums = [5,7,7,8,8,10], target = 6", output: "[-1,-1]" },
    { input: "nums = [], target = 0", output: "[-1,-1]" },
  ],
  template: `class Solution:
    def searchRange(self, nums, target):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [5,7,7,8,8,10], 8, [3,4], "target=8"),
        (2, [5,7,7,8,8,10], 6, [-1,-1], "target=6"),
        (3, [], 0, [-1,-1], "empty"),
        (4, [1], 1, [0,0], "single match"),
        (5, [2,2], 2, [0,1], "all match"),
    ]
    results = []
    for no, nums, target, expected, inp in cases:
        try:
            out = sol.searchRange(nums[:], target)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 66. 搜索旋转排序数组 ─────────────────────────────────
{
  id: 66, lcid: 33, title: "搜索旋转排序数组", difficulty: "中等",
  tags: ["数组", "二分查找"],
  description: `整数数组 \`nums\` 按升序排列，数组中的值**互不相同**。在传递给函数之前，\`nums\` 在预先未知的某个下标 \`k\` 上进行了**旋转**。

例如 \`[0,1,2,4,5,6,7]\` 在下标 3 处经旋转后可能变为 \`[4,5,6,7,0,1,2]\`。

给你旋转后的数组 \`nums\` 和一个整数 \`target\`，如果 \`nums\` 中存在这个目标值 \`target\`，则返回它的下标，否则返回 \`-1\`。

你必须设计一个时间复杂度为 \`O(log n)\` 的算法解决此问题。`,
  examples: [
    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
    { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    { input: "nums = [1], target = 0", output: "-1" },
  ],
  template: `class Solution:
    def search(self, nums, target):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [4,5,6,7,0,1,2], 0, 4, "nums=[4,5,6,7,0,1,2], target=0"),
        (2, [4,5,6,7,0,1,2], 3, -1, "nums=[4,5,6,7,0,1,2], target=3"),
        (3, [1], 0, -1, "nums=[1], target=0"),
        (4, [1,3], 3, 1, "nums=[1,3], target=3"),
    ]
    results = []
    for no, nums, target, expected, inp in cases:
        try:
            out = sol.search(nums[:], target)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 67. 寻找旋转排序数组中的最小值 ────────────────────────────
{
  id: 67, lcid: 153, title: "寻找旋转排序数组中的最小值", difficulty: "中等",
  tags: ["数组", "二分查找"],
  description: `已知一个长度为 \`n\` 的数组，预先按照升序排列，经由 1 到 n 次**旋转**后，得到输入数组。给你一个元素值互不相同的数组 \`nums\`，返回数组中的**最小元素**。你必须设计一个时间复杂度为 \`O(log n)\` 的算法解决此问题。`,
  examples: [
    { input: "nums = [3,4,5,1,2]", output: "1" },
    { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
    { input: "nums = [11,13,15,17]", output: "11", explanation: "原数组本身（无旋转）" },
  ],
  template: `class Solution:
    def findMin(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [3,4,5,1,2], 1, "nums=[3,4,5,1,2]"),
        (2, [4,5,6,7,0,1,2], 0, "nums=[4,5,6,7,0,1,2]"),
        (3, [11,13,15,17], 11, "无旋转"),
        (4, [2,1], 1, "nums=[2,1]"),
        (5, [1], 1, "单元素"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.findMin(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 68. 寻找两个正序数组的中位数 ─────────────────────────────
{
  id: 68, lcid: 4, title: "寻找两个正序数组的中位数", difficulty: "困难",
  tags: ["数组", "二分查找", "分治"],
  description: `给定两个大小分别为 \`m\` 和 \`n\` 的正序数组 \`nums1\` 和 \`nums2\`，请你找出并返回这两个正序数组的**中位数**。要求时间复杂度 O(log(m+n))。`,
  examples: [
    { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
    { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" },
  ],
  template: `class Solution:
    def findMedianSortedArrays(self, nums1, nums2):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,3], [2], 2.0, "nums1=[1,3],nums2=[2]"),
        (2, [1,2], [3,4], 2.5, "nums1=[1,2],nums2=[3,4]"),
        (3, [], [1], 1.0, "empty+[1]"),
        (4, [2], [], 2.0, "[2]+empty"),
        (5, [0,0], [0,0], 0.0, "all zeros"),
    ]
    results = []
    for no, n1, n2, expected, inp in cases:
        try:
            out = sol.findMedianSortedArrays(n1[:], n2[:])
            passed = abs(out - expected) < 1e-5
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 69. 有效的括号 ────────────────────────────────────
{
  id: 69, lcid: 20, title: "有效的括号", difficulty: "简单",
  tags: ["栈", "字符串"],
  description: `给定一个只包括 \`'('\`，\`')'\`，\`'{'\`，\`'}'\`，\`'['\`，\`']'\` 的字符串 \`s\`，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。`,
  examples: [
    { input: 's = "()"', output: "true" },
    { input: 's = "()[]{}"', output: "true" },
    { input: 's = "(]"', output: "false" },
  ],
  template: `class Solution:
    def isValid(self, s):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "()", True, 's="()"'),
        (2, "()[]{}", True, 's="()[]{}"'),
        (3, "(]", False, 's="(]"'),
        (4, "([)]", False, 's="([)]"'),
        (5, "{[]}", True, 's="{[]}"'),
    ]
    results = []
    for no, s, expected, inp in cases:
        try:
            out = sol.isValid(s)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 70. 最小栈 ──────────────────────────────────────
{
  id: 70, lcid: 155, title: "最小栈", difficulty: "中等",
  tags: ["栈", "设计"],
  description: `设计一个支持 \`push\`、\`pop\`、\`top\` 操作，并能在**常数时间**内检索到最小元素的栈。\`getMin()\` 时间复杂度必须为 O(1)。`,
  examples: [
    { input: '["MinStack","push","push","push","getMin","pop","top","getMin"] [[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]' },
  ],
  template: `class MinStack:
    def __init__(self):
        ...
    def push(self, val):
        ...
    def pop(self):
        ...
    def top(self):
        ...
    def getMin(self):
        ...`,
  setup_code: `
class Solution: pass
def _run_tests(_):
    results = []
    try:
        stk = MinStack()
        stk.push(-2); stk.push(0); stk.push(-3)
        r1 = stk.getMin(); stk.pop()
        r2 = stk.top(); r3 = stk.getMin()
        passed = r1 == -3 and r2 == 0 and r3 == -2
        results.append({"case":1,"passed":passed,"input":"push -2,0,-3","expected":"getMin=-3,top=0,getMin=-2","output":f"getMin={r1},top={r2},getMin={r3}"})
    except Exception as e:
        results.append({"case":1,"passed":False,"input":"push -2,0,-3","error":str(e)})
    try:
        stk = MinStack()
        stk.push(5); stk.push(3); stk.push(7)
        r1 = stk.getMin(); stk.pop(); r2 = stk.getMin()
        passed = r1 == 3 and r2 == 3
        results.append({"case":2,"passed":passed,"input":"push 5,3,7","expected":"getMin=3,3","output":f"getMin={r1},{r2}"})
    except Exception as e:
        results.append({"case":2,"passed":False,"input":"push 5,3,7","error":str(e)})
    return results
`
},

// ── 71. 字符串解码 ────────────────────────────────────
{
  id: 71, lcid: 394, title: "字符串解码", difficulty: "中等",
  tags: ["字符串", "栈", "递归"],
  description: `给定编码字符串，返回解码后的字符串。编码规则：\`k[encoded_string]\` 表示 \`encoded_string\` 重复 \`k\` 次（支持嵌套）。`,
  examples: [
    { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
    { input: 's = "3[a2[c]]"', output: '"accaccacc"' },
    { input: 's = "2[abc]3[cd]ef"', output: '"abcabccdcdcdef"' },
  ],
  template: `class Solution:
    def decodeString(self, s):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "3[a]2[bc]", "aaabcbc", "基本"),
        (2, "3[a2[c]]", "accaccacc", "嵌套"),
        (3, "2[abc]3[cd]ef", "abcabccdcdcdef", "多组"),
        (4, "abc", "abc", "无编码"),
        (5, "10[a]", "a"*10, "两位数k"),
    ]
    results = []
    for no, s, expected, inp in cases:
        try:
            out = sol.decodeString(s)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":expected,"output":out})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 72. 每日温度 ─────────────────────────────────────
{
  id: 72, lcid: 739, title: "每日温度", difficulty: "中等",
  tags: ["数组", "栈", "单调栈"],
  description: `给定整数数组 \`temperatures\`（每天温度），返回数组 \`answer\`，\`answer[i]\` 表示第 \`i\` 天后下一个更高温度出现在几天后，之后不升高则为 \`0\`。`,
  examples: [
    { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
    { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
    { input: "temperatures = [30,60,90]", output: "[1,1,0]" },
  ],
  template: `class Solution:
    def dailyTemperatures(self, temperatures):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [73,74,75,71,69,72,76,73], [1,1,4,2,1,1,0,0], "8天"),
        (2, [30,40,50,60], [1,1,1,0], "单调递增"),
        (3, [30,60,90], [1,1,0], "3天"),
        (4, [89,62,70,58,47,47,46,76,100,70], [8,1,5,4,3,2,1,1,0,0], "复杂"),
    ]
    results = []
    for no, temps, expected, inp in cases:
        try:
            out = sol.dailyTemperatures(temps[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 73. 柱状图中最大的矩形 ────────────────────────────────
{
  id: 73, lcid: 84, title: "柱状图中最大的矩形", difficulty: "困难",
  tags: ["数组", "栈", "单调栈"],
  description: `给定 \`n\` 个非负整数，用来表示柱状图中各个柱子的高度，每个柱子彼此相邻且宽度为 1。求能够勾勒出的**矩形的最大面积**。`,
  examples: [
    { input: "heights = [2,1,5,6,2,3]", output: "10" },
    { input: "heights = [2,4]", output: "4" },
  ],
  template: `class Solution:
    def largestRectangleArea(self, heights):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [2,1,5,6,2,3], 10, "heights=[2,1,5,6,2,3]"),
        (2, [2,4], 4, "heights=[2,4]"),
        (3, [1], 1, "heights=[1]"),
        (4, [1,1], 2, "heights=[1,1]"),
        (5, [0,9], 9, "heights=[0,9]"),
    ]
    results = []
    for no, h, expected, inp in cases:
        try:
            out = sol.largestRectangleArea(h[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 74. 数组中的第K个最大元素 ──────────────────────────────
{
  id: 74, lcid: 215, title: "数组中的第K个最大元素", difficulty: "中等",
  tags: ["数组", "堆", "排序", "快速选择"],
  description: `给定整数数组 \`nums\` 和整数 \`k\`，返回数组中**第 k 个最大的元素**（排序后第 k 大）。**进阶：** 尝试 O(n) 的快速选择算法。`,
  examples: [
    { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
    { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
  ],
  template: `class Solution:
    def findKthLargest(self, nums, k):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [3,2,1,5,6,4], 2, 5, "nums=[3,2,1,5,6,4], k=2"),
        (2, [3,2,3,1,2,4,5,5,6], 4, 4, "nums=[3,2,3,1,2,4,5,5,6], k=4"),
        (3, [1], 1, 1, "nums=[1], k=1"),
        (4, [2,1], 2, 1, "nums=[2,1], k=2"),
    ]
    results = []
    for no, nums, k, expected, inp in cases:
        try:
            out = sol.findKthLargest(nums[:], k)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 75. 前K个高频元素 ──────────────────────────────────
{
  id: 75, lcid: 347, title: "前K个高频元素", difficulty: "中等",
  tags: ["数组", "哈希表", "堆", "排序"],
  description: `给你一个整数数组 \`nums\` 和整数 \`k\`，请你返回其中出现频率前 \`k\` 高的元素。**要求：** 算法的时间复杂度必须优于 O(n log n)。`,
  examples: [
    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
    { input: "nums = [1], k = 1", output: "[1]" },
  ],
  template: `class Solution:
    def topKFrequent(self, nums, k):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,1,1,2,2,3], 2, {1,2}, "nums=[1,1,1,2,2,3],k=2"),
        (2, [1], 1, {1}, "nums=[1],k=1"),
        (3, [4,1,-1,2,-1,2,3], 2, {-1,2}, "nums=[4,1,-1,2,-1,2,3],k=2"),
    ]
    results = []
    for no, nums, k, expected, inp in cases:
        try:
            out = set(sol.topKFrequent(nums[:], k))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(sorted(expected)),"output":str(sorted(out))})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 76. 数据流的中位数 ──────────────────────────────────
{
  id: 76, lcid: 295, title: "数据流的中位数", difficulty: "困难",
  tags: ["堆", "数据流", "双指针"],
  description: `**中位数**是有序整数列表中的中间值。如果列表大小是偶数，则没有中间值，中位数是两个中间值的平均值。实现 \`MedianFinder\` 类：\`addNum(int num)\` 将数据流中的整数 \`num\` 添加到数据结构中；\`findMedian()\` 返回目前数据流中所有元素的中位数。**方法：** 大顶堆 + 小顶堆维护左右两半。`,
  examples: [
    { input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"] [[],[1],[2],[],[3],[]]', output: "[null,null,null,1.5,null,2.0]" },
  ],
  template: `class MedianFinder:
    def __init__(self):
        ...
    def addNum(self, num):
        ...
    def findMedian(self):
        ...`,
  setup_code: `
class Solution: pass
def _run_tests(_):
    results = []
    try:
        mf = MedianFinder()
        mf.addNum(1); mf.addNum(2); r1 = mf.findMedian()
        mf.addNum(3); r2 = mf.findMedian()
        passed = r1 == 1.5 and r2 == 2.0
        results.append({"case":1,"passed":passed,"input":"add 1,2,3","expected":"1.5 then 2.0","output":f"{r1} then {r2}"})
    except Exception as e:
        results.append({"case":1,"passed":False,"input":"add 1,2,3","error":str(e)})
    try:
        mf = MedianFinder()
        mf.addNum(5); r1 = mf.findMedian()
        mf.addNum(3); r2 = mf.findMedian()
        mf.addNum(8); r3 = mf.findMedian()
        passed = r1 == 5 and r2 == 4.0 and r3 == 5
        results.append({"case":2,"passed":passed,"input":"add 5,3,8","expected":"5, 4.0, 5","output":f"{r1},{r2},{r3}"})
    except Exception as e:
        results.append({"case":2,"passed":False,"input":"add 5,3,8","error":str(e)})
    return results
`
},

// ── 77. 买卖股票的最佳时机 ────────────────────────────────
{
  id: 77, lcid: 121, title: "买卖股票的最佳时机", difficulty: "简单",
  tags: ["数组", "动态规划"],
  description: `给定一个数组 \`prices\`，它的第 \`i\` 个元素 \`prices[i]\` 表示一支给定股票第 \`i\` 天的价格。

你只能选择**某一天**买入这只股票，并选择在**未来的某一个不同的日子**卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润，如果你不能获取任何利润，返回 \`0\`。`,
  examples: [
    { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "第2天买入（价格=1），第5天卖出（价格=6），利润 = 6-1 = 5" },
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "价格持续下降，无法获利" },
  ],
  template: `class Solution:
    def maxProfit(self, prices):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [7,1,5,3,6,4], 5, "prices=[7,1,5,3,6,4]"),
        (2, [7,6,4,3,1], 0, "prices=[7,6,4,3,1]"),
        (3, [1,2], 1, "prices=[1,2]"),
        (4, [2,4,1], 2, "prices=[2,4,1]"),
    ]
    results = []
    for no, prices, expected, inp in cases:
        try:
            out = sol.maxProfit(prices[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 78. 跳跃游戏 ─────────────────────────────────────
{
  id: 78, lcid: 55, title: "跳跃游戏", difficulty: "中等",
  tags: ["数组", "贪心", "动态规划"],
  description: `给你一个非负整数数组 \`nums\`，你最初位于数组的**第一个下标**，数组中的每个元素代表你在该位置可以跳跃的**最大长度**。

判断你是否能够到达最后一个下标，如果可以，返回 \`true\`；否则，返回 \`false\`。`,
  examples: [
    { input: "nums = [2,3,1,1,4]", output: "true", explanation: "可以先跳1步到下标1，再从下标1跳3步到最后" },
    { input: "nums = [3,2,1,0,4]", output: "false", explanation: "无论如何都会到达下标3，其最大跳跃长度是0，永远无法到达最后" },
  ],
  template: `class Solution:
    def canJump(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [2,3,1,1,4], True, "nums=[2,3,1,1,4]"),
        (2, [3,2,1,0,4], False, "nums=[3,2,1,0,4]"),
        (3, [0], True, "nums=[0]"),
        (4, [1,0], True, "nums=[1,0]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.canJump(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 79. 跳跃游戏 II ──────────────────────────────────
{
  id: 79, lcid: 45, title: "跳跃游戏 II", difficulty: "中等",
  tags: ["数组", "贪心", "动态规划"],
  description: `给定一个长度为 \`n\` 的 0 索引整数数组 \`nums\`。初始位置为 \`nums[0]\`，每个元素 \`nums[i]\` 表示从索引 \`i\` 向前跳转的最大长度。返回到达 \`nums[n - 1]\` 的**最小跳跃次数**。题目保证一定可以到达。`,
  examples: [
    { input: "nums = [2,3,1,1,4]", output: "2", explanation: "跳到下标1，再从下标1跳到最后" },
    { input: "nums = [2,3,0,1,4]", output: "2" },
  ],
  template: `class Solution:
    def jump(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [2,3,1,1,4], 2, "nums=[2,3,1,1,4]"),
        (2, [2,3,0,1,4], 2, "nums=[2,3,0,1,4]"),
        (3, [1], 0, "单元素"),
        (4, [1,2], 1, "nums=[1,2]"),
        (5, [1,1,1,1], 3, "nums=[1,1,1,1]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.jump(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 80. 划分字母区间 ───────────────────────────────────
{
  id: 80, lcid: 763, title: "划分字母区间", difficulty: "中等",
  tags: ["贪心", "哈希表", "字符串", "双指针"],
  description: `给你一个字符串 \`s\` 。我们要把这个字符串划分为尽可能多的片段，同一字母**最多**出现在一个片段中。注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 \`s\` 。返回一个表示每个字符串片段的长度的列表。`,
  examples: [
    { input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]" },
    { input: 's = "eccbbbbdec"', output: "[10]" },
  ],
  template: `class Solution:
    def partitionLabels(self, s):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "ababcbacadefegdehijhklij", [9,7,8], 's="ababcbacadefegdehijhklij"'),
        (2, "eccbbbbdec", [10], 's="eccbbbbdec"'),
        (3, "a", [1], 's="a"'),
        (4, "abcde", [1,1,1,1,1], 's="abcde"'),
    ]
    results = []
    for no, s, expected, inp in cases:
        try:
            out = sol.partitionLabels(s)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 81. 爬楼梯 ──────────────────────────────────────
{
  id: 81, lcid: 70, title: "爬楼梯", difficulty: "简单",
  tags: ["动态规划", "记忆化搜索", "斐波那契数列"],
  description: `假设你正在爬楼梯。需要 \`n\` 阶你才能到达楼顶。

每次你可以爬 \`1\` 或 \`2\` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**规律：** \`f(n) = f(n-1) + f(n-2)\`，本质是斐波那契数列。`,
  examples: [
    { input: "n = 2", output: "2", explanation: "两种方法: 1阶+1阶 或 2阶" },
    { input: "n = 3", output: "3", explanation: "三种方法: 1+1+1 / 1+2 / 2+1" },
  ],
  template: `class Solution:
    def climbStairs(self, n):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, 2, 2, "n=2"),
        (2, 3, 3, "n=3"),
        (3, 5, 8, "n=5"),
        (4, 10, 89, "n=10"),
    ]
    results = []
    for no, n, expected, inp in cases:
        try:
            out = sol.climbStairs(n)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 82. 杨辉三角 ─────────────────────────────────────
{
  id: 82, lcid: 118, title: "杨辉三角", difficulty: "简单",
  tags: ["数组", "动态规划"],
  description: `给定一个非负整数 \`numRows\`，生成**杨辉三角**的前 \`numRows\` 行。在杨辉三角中，每个数是它左上方和右上方的数的和（边界为 1）。`,
  examples: [
    { input: "numRows = 5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" },
    { input: "numRows = 1", output: "[[1]]" },
  ],
  template: `class Solution:
    def generate(self, numRows):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, 5, [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]], "numRows=5"),
        (2, 1, [[1]], "numRows=1"),
        (3, 2, [[1],[1,1]], "numRows=2"),
        (4, 6, [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1]], "numRows=6"),
    ]
    results = []
    for no, numRows, expected, inp in cases:
        try:
            out = sol.generate(numRows)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 83. 打家劫舍 ─────────────────────────────────────
{
  id: 83, lcid: 198, title: "打家劫舍", difficulty: "中等",
  tags: ["动态规划", "数组"],
  description: `你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果**两间相邻的房屋**在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组 \`nums\`，计算你**不触动警报装置的情况下**，一夜之内能够偷窃到的最高金额。`,
  examples: [
    { input: "nums = [1,2,3,1]", output: "4", explanation: "偷窃第1间(1) + 第3间(3)，共 4" },
    { input: "nums = [2,7,9,3,1]", output: "12", explanation: "偷窃第1间(2)+第3间(9)+第5间(1)，共 12" },
  ],
  template: `class Solution:
    def rob(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [1,2,3,1], 4, "nums=[1,2,3,1]"),
        (2, [2,7,9,3,1], 12, "nums=[2,7,9,3,1]"),
        (3, [1], 1, "nums=[1]"),
        (4, [2,1], 2, "nums=[2,1]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.rob(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 84. 完全平方数 ────────────────────────────────────
{
  id: 84, lcid: 279, title: "完全平方数", difficulty: "中等",
  tags: ["动态规划", "数学", "广度优先搜索"],
  description: `给你一个整数 \`n\`，返回和为 \`n\` 的完全平方数的**最少数量**（完全平方数 = 1, 4, 9, 16…）。`,
  examples: [
    { input: "n = 12", output: "3", explanation: "4+4+4" },
    { input: "n = 13", output: "2", explanation: "4+9" },
  ],
  template: `class Solution:
    def numSquares(self, n):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, 12, 3, "n=12"),
        (2, 13, 2, "n=13"),
        (3, 1, 1, "n=1"),
        (4, 4, 1, "n=4"),
        (5, 7, 4, "n=7"),
    ]
    results = []
    for no, n, expected, inp in cases:
        try:
            out = sol.numSquares(n)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 85. 零钱兑换 ─────────────────────────────────────
{
  id: 85, lcid: 322, title: "零钱兑换", difficulty: "中等",
  tags: ["动态规划", "数组", "广度优先搜索"],
  description: `给你一个整数数组 \`coins\`（不同面额的硬币）和总金额 \`amount\`，计算凑成总金额所需的**最少硬币个数**，无法凑成返回 \`-1\`（每种面额可无限使用）。`,
  examples: [
    { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "5+5+1=11" },
    { input: "coins = [2], amount = 3", output: "-1" },
    { input: "coins = [1], amount = 0", output: "0" },
  ],
  template: `class Solution:
    def coinChange(self, coins, amount):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,2,5], 11, 3, "coins=[1,2,5],amount=11"),
        (2, [2], 3, -1, "coins=[2],amount=3"),
        (3, [1], 0, 0, "amount=0"),
        (4, [1,5,10,25], 36, 3, "coins=[1,5,10,25],amount=36"),
    ]
    results = []
    for no, coins, amount, expected, inp in cases:
        try:
            out = sol.coinChange(coins[:], amount)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 86. 单词拆分 ─────────────────────────────────────
{
  id: 86, lcid: 139, title: "单词拆分", difficulty: "中等",
  tags: ["动态规划", "字符串", "哈希表"],
  description: `给你一个字符串 \`s\` 和一个字符串列表 \`wordDict\`，判断 \`s\` 是否可以利用字典中出现的单词**拼接**而成（单词可以重复使用）。`,
  examples: [
    { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true" },
    { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true" },
    { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false" },
  ],
  template: `class Solution:
    def wordBreak(self, s, wordDict):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "leetcode", ["leet","code"], True, 's="leetcode"'),
        (2, "applepenapple", ["apple","pen"], True, 's="applepenapple"'),
        (3, "catsandog", ["cats","dog","sand","and","cat"], False, 's="catsandog"'),
        (4, "a", ["b"], False, 's="a"'),
    ]
    results = []
    for no, s, wd, expected, inp in cases:
        try:
            out = sol.wordBreak(s, wd[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 87. 最长递增子序列 ──────────────────────────────────
{
  id: 87, lcid: 300, title: "最长递增子序列", difficulty: "中等",
  tags: ["动态规划", "数组", "二分查找"],
  description: `给你一个整数数组 \`nums\`，找到其中**最长严格递增子序列**的长度。**进阶：** 贪心 + 二分查找可达 O(n log n)。`,
  examples: [
    { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "最长子序列 [2,3,7,101]，长度 4" },
    { input: "nums = [0,1,0,3,2,3]", output: "4" },
    { input: "nums = [7,7,7,7,7,7,7]", output: "1" },
  ],
  template: `class Solution:
    def lengthOfLIS(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [10,9,2,5,3,7,101,18], 4, "nums=[10,9,2,5,3,7,101,18]"),
        (2, [0,1,0,3,2,3], 4, "nums=[0,1,0,3,2,3]"),
        (3, [7,7,7,7,7,7,7], 1, "nums=[7,7,7,7,7,7,7]"),
        (4, [1,3,6,7,9,4,10,5,6], 6, "nums=[1,3,6,7,9,4,10,5,6]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.lengthOfLIS(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 88. 乘积最大子数组 ──────────────────────────────────
{
  id: 88, lcid: 152, title: "乘积最大子数组", difficulty: "中等",
  tags: ["数组", "动态规划"],
  description: `给你一个整数数组 \`nums\`，找出数组中**乘积最大**的非空连续子数组，返回该子数组对应的乘积。`,
  examples: [
    { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3]" },
    { input: "nums = [-2,0,-1]", output: "0" },
  ],
  template: `class Solution:
    def maxProduct(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [2,3,-2,4], 6, "[2,3,-2,4]"),
        (2, [-2,0,-1], 0, "[-2,0,-1]"),
        (3, [-2], -2, "单负数"),
        (4, [-2,3,-4], 24, "[-2,3,-4]"),
        (5, [0,2], 2, "[0,2]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.maxProduct(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 89. 分割等和子集 ───────────────────────────────────
{
  id: 89, lcid: 416, title: "分割等和子集", difficulty: "中等",
  tags: ["数组", "动态规划"],
  description: `给你一个**只包含正整数**的非空数组 \`nums\`，判断是否可以将数组分割成两个子集，使两个子集的**元素和相等**（0/1 背包变体）。`,
  examples: [
    { input: "nums = [1,5,11,5]", output: "true", explanation: "[1,5,5] 和 [11]" },
    { input: "nums = [1,2,3,5]", output: "false" },
  ],
  template: `class Solution:
    def canPartition(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,5,11,5], True, "[1,5,11,5]"),
        (2, [1,2,3,5], False, "[1,2,3,5]"),
        (3, [1,1], True, "[1,1]"),
        (4, [3,3,3,4,5], True, "[3,3,3,4,5]"),
        (5, [1,2], False, "[1,2]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.canPartition(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 90. 最长有效括号 ───────────────────────────────────
{
  id: 90, lcid: 32, title: "最长有效括号", difficulty: "困难",
  tags: ["字符串", "栈", "动态规划"],
  description: `给你一个只包含 \`(\` 和 \`)\` 的字符串，找出**最长有效（格式正确且连续）括号子串**的长度。`,
  examples: [
    { input: 's = "(()"', output: "2" },
    { input: 's = ")()())"', output: "4" },
    { input: 's = ""', output: "0" },
  ],
  template: `class Solution:
    def longestValidParentheses(self, s):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "(()", 2, 's="(()"'),
        (2, ")()())", 4, 's=")()())"'),
        (3, "", 0, 's=""'),
        (4, "()()", 4, 's="()()"'),
        (5, "(()()", 4, 's="(()()"'),
    ]
    results = []
    for no, s, expected, inp in cases:
        try:
            out = sol.longestValidParentheses(s)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 91. 不同路径 ─────────────────────────────────────
{
  id: 91, lcid: 62, title: "不同路径", difficulty: "中等",
  tags: ["动态规划", "数学", "组合数学"],
  description: `一个机器人位于一个 \`m x n\` 网格的左上角（起始点在下图中标记为 "Start"）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。

问总共有多少条不同的路径？`,
  examples: [
    { input: "m = 3, n = 7", output: "28" },
    { input: "m = 3, n = 2", output: "3" },
  ],
  template: `class Solution:
    def uniquePaths(self, m, n):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, 3, 7, 28, "m=3, n=7"),
        (2, 3, 2, 3, "m=3, n=2"),
        (3, 7, 3, 28, "m=7, n=3"),
        (4, 1, 1, 1, "m=1, n=1"),
    ]
    results = []
    for no, m, n, expected, inp in cases:
        try:
            out = sol.uniquePaths(m, n)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 92. 最小路径和 ────────────────────────────────────
{
  id: 92, lcid: 64, title: "最小路径和", difficulty: "中等",
  tags: ["数组", "动态规划", "矩阵"],
  description: `给定一个包含非负整数的 \`m × n\` 网格 \`grid\`，请找出从**左上角**到**右下角**的路径，使路径数字总和最小（每次只能向下或向右移动）。`,
  examples: [
    { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7", explanation: "1→3→1→1→1" },
    { input: "grid = [[1,2,3],[4,5,6]]", output: "12" },
  ],
  template: `class Solution:
    def minPathSum(self, grid):`,
  setup_code: `
import copy
def _run_tests(sol):
    cases = [
        (1, [[1,3,1],[1,5,1],[4,2,1]], 7, "3x3"),
        (2, [[1,2,3],[4,5,6]], 12, "2x3"),
        (3, [[1]], 1, "1x1"),
        (4, [[1,2],[1,1]], 3, "2x2"),
    ]
    results = []
    for no, grid, expected, inp in cases:
        try:
            out = sol.minPathSum(copy.deepcopy(grid))
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 93. 最长回文子串 ───────────────────────────────────
{
  id: 93, lcid: 5, title: "最长回文子串", difficulty: "中等",
  tags: ["动态规划", "字符串", "双指针"],
  description: `给你一个字符串 \`s\`，找到 \`s\` 中最长的**回文子串**。**方法：** 动态规划 O(n²)、中心扩展法 O(n²)；Manacher 可达 O(n)。`,
  examples: [
    { input: 's = "babad"', output: '"bab"', explanation: '"aba" 也是正确答案' },
    { input: 's = "cbbd"', output: '"bb"' },
  ],
  template: `class Solution:
    def longestPalindrome(self, s):`,
  setup_code: `
def _run_tests(sol):
    def is_pal(s): return s == s[::-1]
    cases = [
        (1, "babad", 3, 's="babad"'),
        (2, "cbbd", 2, 's="cbbd"'),
        (3, "a", 1, 's="a"'),
        (4, "racecar", 7, 's="racecar"'),
        (5, "aacabdkacaa", 3, 's="aacabdkacaa"'),
    ]
    results = []
    for no, s, exp_len, inp in cases:
        try:
            out = sol.longestPalindrome(s)
            passed = is_pal(out) and len(out) == exp_len
            results.append({"case":no,"passed":passed,"input":inp,"expected":"len="+str(exp_len),"output":repr(out)+"(len="+str(len(out))+")"})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 94. 最长公共子序列 ──────────────────────────────────
{
  id: 94, lcid: 1143, title: "最长公共子序列", difficulty: "中等",
  tags: ["动态规划", "字符串"],
  description: `给定两个字符串 \`text1\` 和 \`text2\`，返回这两个字符串的**最长公共子序列**的长度。如果不存在公共子序列，返回 \`0\`。一个字符串的子序列是指这样一个新字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。`,
  examples: [
    { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: '最长公共子序列是 "ace"，它的长度为 3' },
    { input: 'text1 = "abc", text2 = "abc"', output: "3" },
    { input: 'text1 = "abc", text2 = "def"', output: "0" },
  ],
  template: `class Solution:
    def longestCommonSubsequence(self, text1, text2):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "abcde", "ace", 3, 'text1="abcde", text2="ace"'),
        (2, "abc", "abc", 3, 'text1="abc", text2="abc"'),
        (3, "abc", "def", 0, '无公共子序列'),
        (4, "bsbininm", "jmjkbkjkv", 1, '较长字符串'),
    ]
    results = []
    for no, t1, t2, expected, inp in cases:
        try:
            out = sol.longestCommonSubsequence(t1, t2)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 95. 编辑距离 ─────────────────────────────────────
{
  id: 95, lcid: 72, title: "编辑距离", difficulty: "困难",
  tags: ["动态规划", "字符串"],
  description: `给你两个单词 \`word1\` 和 \`word2\`，返回将 \`word1\` 转换成 \`word2\` 所使用的**最少操作数**（插入/删除/替换各算一步）。`,
  examples: [
    { input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: "horse → rorse → rose → ros" },
    { input: 'word1 = "intention", word2 = "execution"', output: "5" },
  ],
  template: `class Solution:
    def minDistance(self, word1, word2):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, "horse", "ros", 3, 'word1="horse", word2="ros"'),
        (2, "intention", "execution", 5, 'word1="intention", word2="execution"'),
        (3, "", "", 0, 'word1="", word2=""'),
        (4, "a", "", 1, 'word1="a", word2=""'),
        (5, "", "b", 1, 'word1="", word2="b"'),
    ]
    results = []
    for no, w1, w2, expected, inp in cases:
        try:
            out = sol.minDistance(w1, w2)
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 96. 只出现一次的数字 ─────────────────────────────────
{
  id: 96, lcid: 136, title: "只出现一次的数字", difficulty: "简单",
  tags: ["位运算", "数组"],
  description: `给你一个**非空**整数数组 \`nums\`，除了某个元素只出现**一次**以外，其余每个元素均出现**两次**。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用**常量**额外空间。

**提示：** 利用异或运算的性质：\`a XOR a = 0\`，\`a XOR 0 = a\`。`,
  examples: [
    { input: "nums = [2,2,1]", output: "1" },
    { input: "nums = [4,1,2,1,2]", output: "4" },
    { input: "nums = [1]", output: "1" },
  ],
  template: `class Solution:
    def singleNumber(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [2,2,1], 1, "nums=[2,2,1]"),
        (2, [4,1,2,1,2], 4, "nums=[4,1,2,1,2]"),
        (3, [1], 1, "nums=[1]"),
        (4, [0,1,0], 1, "nums=[0,1,0]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.singleNumber(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 97. 多数元素 ─────────────────────────────────────
{
  id: 97, lcid: 169, title: "多数元素", difficulty: "简单",
  tags: ["数组", "哈希表", "投票算法"],
  description: `给定一个大小为 \`n\` 的数组 \`nums\`，返回其中的多数元素。多数元素是指在数组中出现次数**大于** \`⌊n/2⌋\` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

**进阶：** 尝试用 O(n) 时间复杂度、O(1) 空间复杂度的**摩尔投票算法**解决此问题。`,
  examples: [
    { input: "nums = [3,2,3]", output: "3" },
    { input: "nums = [2,2,1,1,1,2,2]", output: "2" },
  ],
  template: `class Solution:
    def majorityElement(self, nums):`,
  setup_code: `
def _run_tests(sol):
    from typing import List
    cases = [
        (1, [3,2,3], 3, "nums=[3,2,3]"),
        (2, [2,2,1,1,1,2,2], 2, "nums=[2,2,1,1,1,2,2]"),
        (3, [1], 1, "nums=[1]"),
        (4, [1,1,2,1], 1, "nums=[1,1,2,1]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.majorityElement(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 98. 颜色分类 ─────────────────────────────────────
{
  id: 98, lcid: 75, title: "颜色分类", difficulty: "中等",
  tags: ["数组", "双指针", "排序"],
  description: `给定一个包含红色（0）、白色（1）和蓝色（2）的数组 \`nums\`，使用**原地**算法排序，使相同颜色元素相邻，颜色按 0、1、2 顺序排列（荷兰国旗问题）。`,
  examples: [
    { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" },
    { input: "nums = [2,0,1]", output: "[0,1,2]" },
  ],
  template: `class Solution:
    def sortColors(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [2,0,2,1,1,0], [0,0,1,1,2,2], "[2,0,2,1,1,0]"),
        (2, [2,0,1], [0,1,2], "[2,0,1]"),
        (3, [0], [0], "[0]"),
        (4, [1,2,0], [0,1,2], "[1,2,0]"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            arr = nums[:]
            sol.sortColors(arr)
            passed = arr == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(arr)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

// ── 99. 下一个排列 ────────────────────────────────────
{
  id: 99, lcid: 31, title: "下一个排列", difficulty: "中等",
  tags: ["数组", "双指针"],
  description: `给你一个整数数组 nums，找出 nums 的下一个字典序更大的排列，必须原地修改（只使用额外常数空间）。
如果不存在更大的排列，则将数组排列成最小排列（升序）。`,
  examples: [
    { input: "nums = [1,2,3]", output: "[1,3,2]" },
    { input: "nums = [3,2,1]", output: "[1,2,3]" },
    { input: "nums = [1,1,5]", output: "[1,5,1]" },
  ],
  template: `class Solution:
    def nextPermutation(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,2,3], [1,3,2]),
        (2, [3,2,1], [1,2,3]),
        (3, [1,1,5], [1,5,1]),
        (4, [1], [1]),
    ]
    results = []
    for no, nums, expected in cases:
        try:
            inp = nums[:]
            sol.nextPermutation(inp)
            results.append({"case":no,"passed":inp==expected,"input":str(nums),"expected":str(expected),"output":str(inp)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":str(nums),"error":str(e)})
    return results
`
},

// ── 100. 寻找重复数 ───────────────────────────────────
{
  id: 100, lcid: 287, title: "寻找重复数", difficulty: "中等",
  tags: ["数组", "双指针", "二分查找"],
  description: `给定包含 \`n+1\` 个整数的数组 \`nums\`，每个整数在 \`[1,n]\` 范围内，**只有一个整数出现多次**，找出并返回它。要求不修改数组，O(1) 额外空间。`,
  examples: [
    { input: "nums = [1,3,4,2,2]", output: "2" },
    { input: "nums = [3,1,3,4,2]", output: "3" },
  ],
  template: `class Solution:
    def findDuplicate(self, nums):`,
  setup_code: `
def _run_tests(sol):
    cases = [
        (1, [1,3,4,2,2], 2, "[1,3,4,2,2]"),
        (2, [3,1,3,4,2], 3, "[3,1,3,4,2]"),
        (3, [1,1], 1, "[1,1]"),
        (4, [2,5,9,6,9,3,8,9,7,1], 9, "大数组"),
    ]
    results = []
    for no, nums, expected, inp in cases:
        try:
            out = sol.findDuplicate(nums[:])
            passed = out == expected
            results.append({"case":no,"passed":passed,"input":inp,"expected":str(expected),"output":str(out)})
        except Exception as e:
            results.append({"case":no,"passed":False,"input":inp,"error":str(e)})
    return results
`
},

];
