export interface Question {
  id: number;
  text: string;
}

export interface Dimension {
  id: string;
  name: string;
  subtitle: string;
  questions: Question[];
  threshold: number; // score at or below this = show reflection
  reflection: string;
  reflectionPrompt: string;
}

export type Status = "green" | "amber" | "red";

export interface DimensionResult {
  dimension: Dimension;
  score: number;
  maxScore: number;
  status: Status;
  percentage: number;
}

export interface PatternInterpretation {
  id: string;
  label: string;
  description: string;
  condition: (results: DimensionResult[]) => boolean;
}

export const DIMENSIONS: Dimension[] = [
  {
    id: "wtp-evidence",
    name: "Willingness-to-Pay Evidence",
    subtitle:
      "Has anyone actually committed to paying — not just said they would?",
    questions: [
      {
        id: 1,
        text: "Has at least one buyer committed budget to your product — not \"expressed interest,\" not \"agreed in principle,\" but committed actual money or a signed agreement?",
      },
      {
        id: 2,
        text: "Do you have evidence of what buyers will pay that comes from real transactions or binding commitments — not surveys, not hypothetical conversations, not \"they said they'd pay X\"?",
      },
      {
        id: 3,
        text: "Can you point to a price point that at least one buyer accepted without significant negotiation or discounting?",
      },
      {
        id: 4,
        text: "If you raised your price by 20% tomorrow, do you know — from evidence, not intuition — whether your current buyers would still pay?",
      },
    ],
    threshold: 2,
    reflection:
      "Your pricing is a hypothesis, not a finding. The gap between what buyers say they'll pay and what they actually pay is where most pricing assumptions die. A tech fee from one client is not pricing validation — it's a data point of one.",
    reflectionPrompt:
      "How many times has a buyer seen your price and said yes without negotiation? If the answer is zero, your price is a proposal, not a tested position.",
  },
  {
    id: "pricing-model-fit",
    name: "Pricing Model Fit",
    subtitle:
      "Does your pricing structure match how your buyer budgets and buys?",
    questions: [
      {
        id: 5,
        text: "Is your pricing model (per-seat, per-use, per-outcome, licence, subscription) based on how your buyer allocates budget — not on how you prefer to charge?",
      },
      {
        id: 6,
        text: "Have you tested whether your pricing model creates the right incentive structure — where the buyer pays more as they get more value, not where price scales independently of value delivered?",
      },
      {
        id: 7,
        text: "If your buyer's organisation restructured tomorrow, would your pricing model still make sense — or does it depend on a specific team size, department structure, or budget category that could change?",
      },
    ],
    threshold: 1,
    reflection:
      "Your pricing model was designed for your P&L, not for your buyer's budget process. A per-seat model for a product used by three people in a 50,000-person company is a structural mistake — not because the price is wrong, but because the model is incompatible with how enterprise buyers think about spend.",
    reflectionPrompt:
      "How does your buyer currently pay for the closest alternative to your product — including paying someone's salary, paying a consultant, or paying nothing? That's the pricing model your buyer already understands.",
  },
  {
    id: "budget-procurement",
    name: "Budget & Procurement Alignment",
    subtitle:
      "Do you know where your price lands inside the buyer's organisation?",
    questions: [
      {
        id: 8,
        text: "Can you name the specific budget line within your buyer's organisation that would fund your product — not \"IT budget\" or \"innovation budget\" but the actual line item?",
      },
      {
        id: 9,
        text: "Do you know whether your price falls above or below the procurement threshold that triggers a formal purchasing process in your target buyer's organisation?",
      },
      {
        id: 10,
        text: "Have you identified who controls the budget your product would come from — and is that person the same as, or different from, your champion?",
      },
      {
        id: 11,
        text: "Do you know the typical approval timeline for a purchase at your price point in your buyer's organisation — and have you built that timeline into your sales forecast?",
      },
    ],
    threshold: 2,
    reflection:
      "You know your buyer likes your product but you don't know where the money comes from. In enterprise, \"Which budget line?\" is not a finance question — it's a power question. The person who controls the budget controls the decision. If you can't name them, you're selling to the wrong room. Note: if you're pre-revenue or targeting deals under \u20AC25K, this dimension matters less right now — most sub-threshold purchases don't trigger formal procurement. But if you're targeting enterprise contracts, this is structural.",
    reflectionPrompt:
      "In your last deal that stalled, was it the product that failed — or was it that no one could find the budget? If it's the second, your pricing problem is not the number. It's the location.",
  },
  {
    id: "unit-economics",
    name: "Unit Economics & Value Capture",
    subtitle:
      "Does your pricing capture enough of the value you create to build a business?",
    questions: [
      {
        id: 12,
        text: "Can you state what it costs you to deliver your product to one additional customer — and is that number based on actual delivery experience, not projections?",
      },
      {
        id: 13,
        text: "At your current price point, does the margin per customer cover the cost of acquiring that customer within a reasonable timeframe?",
      },
      {
        id: 14,
        text: "Is your price anchored in the value you create for the buyer (cost saved, revenue generated, risk reduced) rather than in your cost to deliver?",
      },
      {
        id: 15,
        text: "Do you know the ROI framing your buyer needs to justify this purchase internally — and does your price fit within that framing?",
      },
    ],
    threshold: 2,
    reflection:
      "You may be building revenue without building a business. Revenue that doesn't cover acquisition costs is a subsidy, not a business model. And pricing that's anchored in your cost-to-deliver rather than the buyer's value-received leaves money — and positioning — on the table.\n\nTwo pricing anchors exist, and you should know which one you're using. The first: what does the problem cost the buyer today? This is present-state, measurable, and available before you have a working product. The second: what ROI does your solution generate, and what share do you capture? The rule of thumb is 20\u201330% of the value created. If you can only answer the first, that's fine at this stage — but if you can't answer either, your price is a guess.",
    reflectionPrompt:
      "If your buyer saves \u20AC500K per year using your product and you charge \u20AC10K, you're not cheap — you're badly positioned. What is the value you create, and what fraction of it does your price capture?",
  },
  {
    id: "triangle-coherence",
    name: "Triangle Coherence",
    subtitle:
      "Does your pricing reinforce your ICP and value proposition — or contradict them?",
    questions: [
      {
        id: 16,
        text: "If you changed your ICP tomorrow — targeting a different buyer in a different type of organisation — would you also need to change your pricing? If the answer is no, your pricing may not be connected to your buyer.",
      },
      {
        id: 17,
        text: "Does your pricing signal the same positioning as your value proposition? (Premium price for premium value, volume price for operational efficiency, outcome-based price for measurable impact.)",
      },
      {
        id: 18,
        text: "Can your buyer look at your price and immediately understand what they're getting — or does your pricing require a separate explanation that contradicts or complicates your value proposition?",
      },
    ],
    threshold: 1,
    reflection:
      "Your price is telling a different story than your value proposition. This is the Layer 1 triangle failure: three elements that should reinforce each other are operating independently. A premium value proposition with a bargain price confuses the buyer. A cost-reduction value proposition with an outcome-based price creates friction. When the triangle is broken, the symptom shows up downstream as \"deals stalling for no clear reason\" — but the reason is that the buyer's internal logic can't reconcile what you say with what you charge.",
    reflectionPrompt:
      "Imagine your buyer is explaining your product and price to their boss. Does the price reinforce the story — or does it require a separate justification?",
  },
];

export const PATTERN_INTERPRETATIONS: PatternInterpretation[] = [
  {
    id: "revenue-without-pricing",
    label: "Revenue without pricing",
    description:
      "Someone is paying, but you don't know why the model works or where the money comes from. Revenue is masking a structural gap. This pattern produces growth that can't be replicated — because the pricing that got the first client was situational, not systematic.",
    condition: (results) => {
      const wtp = results.find((r) => r.dimension.id === "wtp-evidence");
      const model = results.find(
        (r) => r.dimension.id === "pricing-model-fit"
      );
      const budget = results.find(
        (r) => r.dimension.id === "budget-procurement"
      );
      return (
        wtp !== undefined &&
        model !== undefined &&
        budget !== undefined &&
        (wtp.status === "green" || wtp.status === "amber") &&
        model.status === "red" &&
        budget.status === "red"
      );
    },
  },
  {
    id: "price-without-home",
    label: "Price without a home",
    description:
      "Your pricing is sound in theory but has no location inside the buyer's organisation. \"Which budget line?\" is the question you can't answer. Above the line or below the line? OPEX or CAPEX? Innovation budget or operational budget? Until you know, your deal depends on your champion finding the money — which is not their job.",
    condition: (results) => {
      const budget = results.find(
        (r) => r.dimension.id === "budget-procurement"
      );
      const othersGreen = results.filter(
        (r) =>
          r.dimension.id !== "budget-procurement" &&
          (r.status === "green" || r.status === "amber")
      );
      return (
        budget !== undefined &&
        budget.status === "red" &&
        othersGreen.length >= 2
      );
    },
  },
  {
    id: "founder-set-pricing",
    label: "Founder-set pricing",
    description:
      "Your unit economics make sense on paper, but no buyer has validated the price. This is pricing designed in a spreadsheet, not in a negotiation. The most common version: the founder picks a number that looks reasonable, never tests it, and discovers the problem only when deals stall.",
    condition: (results) => {
      const wtp = results.find((r) => r.dimension.id === "wtp-evidence");
      const unit = results.find((r) => r.dimension.id === "unit-economics");
      return (
        wtp !== undefined &&
        unit !== undefined &&
        wtp.status === "red" &&
        (unit.status === "amber" || unit.status === "green")
      );
    },
  },
  {
    id: "broken-triangle",
    label: "Broken triangle",
    description:
      "Your pricing is disconnected from your ICP and value proposition. This is the most common Layer 1 failure pattern — founders set ICP, value prop, and pricing independently, as if they were three separate decisions. They're one decision with three faces. When the triangle is broken, every downstream layer inherits the incoherence.",
    condition: (results) => {
      const triangle = results.find(
        (r) => r.dimension.id === "triangle-coherence"
      );
      const othersRed = results.filter(
        (r) => r.dimension.id !== "triangle-coherence" && r.status === "red"
      );
      return (
        triangle !== undefined &&
        triangle.status === "red" &&
        othersRed.length >= 1
      );
    },
  },
  {
    id: "universally-unvalidated",
    label: "Universally unvalidated",
    description:
      "Your pricing is a placeholder, not a strategy. This isn't a refinement problem — it's a discovery problem. Before optimising your price point, you need to answer three structural questions: Who is paying? From which budget? For which value? Those answers come from buyer conversations, not internal modelling.",
    condition: (results) => {
      const totalScore = results.reduce((sum, r) => sum + r.score, 0);
      return totalScore <= 8;
    },
  },
  {
    id: "model-misfit",
    label: "Model misfit",
    description:
      "Your pricing level may be defensible, but the pricing structure is wrong for how your buyer budgets, experiences, or measures value. How you charge is often more important than how much you charge. A founder can have validated willingness-to-pay, know the budget location, and still have a model that creates friction — per-seat when usage-based fits, subscription when outcome-based would close faster.",
    condition: (results) => {
      const model = results.find(
        (r) => r.dimension.id === "pricing-model-fit"
      );
      const othersOk = results.filter(
        (r) =>
          r.dimension.id !== "pricing-model-fit" &&
          (r.status === "green" || r.status === "amber")
      );
      return (
        model !== undefined &&
        model.status === "red" &&
        othersOk.length >= 2
      );
    },
  },
];

export const COI_COPY = {
  heading: "The Downstream Cost of Unvalidated Pricing",
  intro:
    "Pricing gaps don't announce themselves. They surface as downstream symptoms: deals that stall at procurement, champions who can't build a business case, pilots that succeed but never convert to contracts.",
  body: "Founders who defer pricing discovery typically encounter it as a Layer 2 or Layer 3 problem — \"our pilot didn't convert\" or \"our pipeline isn't closing\" — when the structural issue is one layer upstream. The buyer couldn't find the budget. The price didn't match the value type. The model didn't fit the procurement process. By then, months of commercial effort have been built on a pricing assumption no one tested.",
};

export const CTA_COPY = {
  heading: "What This Diagnostic Surfaces — and What It Can't Fix",
  body: `This tool reveals where your pricing has structural gaps. It doesn't set your price — because the right price depends on your specific buyer, their budget structure, their procurement process, and the value type they decide on.

Pricing work is positioning work. It requires understanding not just what your product costs to deliver, but what value it creates, how the buyer measures that value, and where inside their organisation the money would come from. A generic pricing adjustment won't fix a structural misalignment between your price and your buyer's decision logic.`,
  callout:
    "If your profile shows gaps in two or more dimensions, a structured pricing workshop can help you identify whether this is a number problem, a model problem, or a positioning problem — and what to address first.",
  triangleReminder:
    "Your pricing doesn't exist in isolation. It must cohere with your ICP (who pays) and your value proposition (what they're paying for). If you haven't assessed those, start there.",
  contact: {
    name: "Alexandra N.",
    title: "Founder, Aieutics",
    subtitle: "Executive coaching & strategic transformation",
    website: "aieutics.com",
    email: "hello@aieutics.com",
  },
};

export const ATTRIBUTION =
  "Developed by Aieutics from the Critical Path Layers framework. Based on patterns observed across executive coaching, corporate accelerator programmes, and consulting engagements.";
