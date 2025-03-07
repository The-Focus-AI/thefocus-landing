import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LiteracyTimeline = () => {
  // State for hover information
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Data points combining timeline, literacy rates, economic value, utility, and writing difficulty
  const timelineData = [
    {
      year: -3000,
      period: "Ancient Civilizations",
      literacyRate: 0.1, // 0.1% literacy
      economicValue: 95, // Very high economic value for scribes
      socialUtility: 30, // Limited utility for most people
      writingDifficulty: 95, // Very difficult (cuneiform, hieroglyphics)
    },
    {
      year: -500,
      period: "Classical Antiquity",
      literacyRate: 5, // Estimated 5-10% in Greece/Rome at peak
      economicValue: 85,
      socialUtility: 40,
      writingDifficulty: 85,
    },
    {
      year: 500,
      period: "Early Medieval",
      literacyRate: 1, // Decline after Roman Empire
      economicValue: 90, // High scarcity value
      socialUtility: 20, // Limited to church/state
      writingDifficulty: 90, // Difficult, specialized skill
    },
    {
      year: 1450,
      period: "Printing Press",
      literacyRate: 5,
      economicValue: 70, // Still valuable but less exclusive
      socialUtility: 50, // Growing utility
      writingDifficulty: 70, // Still difficult but more standardized
    },
    {
      year: 1650,
      period: "Enlightenment",
      literacyRate: 20, // Growing in urban centers
      economicValue: 60,
      socialUtility: 65,
      writingDifficulty: 60,
    },
    {
      year: 1800,
      period: "Industrial Revolution",
      literacyRate: 40, // Significant growth
      economicValue: 50, // Becoming more common
      socialUtility: 75, // Increasingly important
      writingDifficulty: 50, // Standardized education
    },
    {
      year: 1900,
      period: "Mass Media Era",
      literacyRate: 70, // Mass literacy in developed nations
      economicValue: 40, // Common skill
      socialUtility: 85, // Essential for most jobs
      writingDifficulty: 40, // Public education standard
    },
    {
      year: 1950,
      period: "Post-War Era",
      literacyRate: 80,
      economicValue: 30, // Expected skill
      socialUtility: 90,
      writingDifficulty: 30, // Typing skills common
    },
    {
      year: 2000,
      period: "Internet Age",
      literacyRate: 85, // Global literacy rising
      economicValue: 20, // Ubiquitous requirement
      socialUtility: 95, // Essential for daily life
      writingDifficulty: 20, // Word processors, email
    },
    {
      year: 2020,
      period: "Mobile/AI Era",
      literacyRate: 87, // Global literacy ~87%
      economicValue: 15, // Basic expectation
      socialUtility: 98, // Nearly universal need
      writingDifficulty: 5, // Text, voice-to-text, autocomplete
    },
  ];

  // Key milestones for markers and details
  const keyMilestones = [
    {
      year: -3000,
      name: "First writing systems",
      description:
        "Cuneiform in Mesopotamia and hieroglyphics in Egypt were among the earliest writing systems, used by specialized scribes for religious and administrative purposes.",
    },
    {
      year: -650,
      name: "Alphabetic systems",
      description:
        "Simpler alphabetic writing systems spread through the Mediterranean, somewhat lowering the barrier to literacy.",
    },
    {
      year: 1450,
      name: "Gutenberg press",
      description:
        "Revolutionized text reproduction, reducing book costs by 95% and enabling mass production of written works.",
    },
    {
      year: 1517,
      name: "Luther's 95 Theses",
      description:
        "Used the printing press to spread religious ideas rapidly across Europe, demonstrating the power of mass printing.",
    },
    {
      year: 1650,
      name: "Coffee house culture",
      description:
        "London 'penny universities' allowed anyone to read newspapers and join intellectual discussions for the price of a coffee.",
    },
    {
      year: 1702,
      name: "First daily newspaper",
      description:
        "The Daily Courant in London began the era of daily news publishing.",
    },
    {
      year: 1776,
      name: "Common Sense pamphlet",
      description:
        "Thomas Paine's pamphlet sold 500,000 copies in a population of 2.5 million, helping catalyze the American Revolution.",
    },
    {
      year: 1833,
      name: "Penny Press",
      description:
        "New York Sun sold for one cent instead of six, expanding newspaper readership to the working class.",
    },
    {
      year: 1840,
      name: "Penny Post",
      description:
        "Standardized affordable postage created an explosion in personal letter writing across all social classes.",
    },
    {
      year: 1844,
      name: "Telegraph",
      description:
        "Enabled instant news transmission across vast distances, transforming journalism.",
    },
    {
      year: 1870,
      name: "Typewriter",
      description:
        "Commercial typewriters created a new professional class of office workers and standardized business communication.",
    },
    {
      year: 1884,
      name: "Linotype machine",
      description:
        "Mechanized typesetting increased newspaper production speed sixfold.",
    },
    {
      year: 1890,
      name: "Peak newspaper era",
      description:
        "Yellow journalism and mass circulation newspapers reached unprecedented audiences.",
    },
    {
      year: 1959,
      name: "Photocopier",
      description:
        "Xerox machine democratized document duplication for organizations and individuals.",
    },
    {
      year: 1985,
      name: "Desktop publishing",
      description:
        "Software and laser printers allowed individuals to create professional publications without specialized training.",
    },
    {
      year: 1992,
      name: "SMS text messaging",
      description:
        "Created a new form of casual, immediate written communication.",
    },
    {
      year: 1999,
      name: "Blogging platforms",
      description:
        "Enabled anyone with internet access to publish writing globally without technical knowledge.",
    },
    {
      year: 2006,
      name: "Social media explosion",
      description:
        "Platforms like Twitter transformed written expression into short-form content accessible to massive audiences.",
    },
    {
      year: 2010,
      name: "Smartphone ubiquity",
      description:
        "Put text creation tools in everyone's pockets, making written communication constant and casual.",
    },
    {
      year: 2011,
      name: "Voice-to-text advances",
      description:
        "Removed the barrier of typing skill from written communication.",
    },
  ];

  // Function to display milestone details
  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  // Format the x-axis label
  const formatXAxis = (year) => {
    if (year < 0) {
      return Math.abs(year) + " BCE";
    }
    return year + " CE";
  };

  // Custom tooltip component
  const CustomTooltip = ({ active = false, payload = [] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-lg">
          <h3 className="text-lg font-bold">
            {data.period} ({formatXAxis(data.year)})
          </h3>
          <p>
            <span className="font-medium">Literacy Rate:</span>{" "}
            {data.literacyRate}% of population
          </p>
          <p>
            <span className="font-medium">Economic Value:</span>{" "}
            {data.economicValue}/100
          </p>
          <p>
            <span className="font-medium">Social Utility:</span>{" "}
            {data.socialUtility}/100
          </p>
          <p>
            <span className="font-medium">Writing Difficulty:</span>{" "}
            {data.writingDifficulty}/100
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        The Evolution of Literacy and Written Communication
      </h2>

      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timelineData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="year"
              tickFormatter={formatXAxis}
              type="number"
              label={{ value: "Year", position: "bottom", offset: 0 }}
            />
            <YAxis
              label={{
                value: "Scale (0-100)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" />

            <Line
              type="monotone"
              dataKey="literacyRate"
              name="Literacy Rate (%)"
              stroke="#8884d8"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="socialUtility"
              name="Social Utility of Literacy"
              stroke="#4CAF50"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="economicValue"
              name="Economic Value of Literacy Profession"
              stroke="#FF9800"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="writingDifficulty"
              name="Difficulty of Writing"
              stroke="#F44336"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline of milestones section */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-xl font-bold mb-4">
          Key Milestones in Written Communication
        </h3>
        <div className="overflow-x-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {keyMilestones.map((milestone, index) => (
              <button
                key={index}
                className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                onClick={() => handleMilestoneClick(milestone)}
              >
                {milestone.name} ({formatXAxis(milestone.year)})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Milestone detail section */}
      {selectedMilestone && (
        <div className="p-4 bg-gray-100 rounded-lg mb-6">
          <h3 className="text-lg font-bold">
            {selectedMilestone.name} ({formatXAxis(selectedMilestone.year)})
          </h3>
          <p className="mt-2">{selectedMilestone.description}</p>
        </div>
      )}

      <div className="text-sm text-gray-600 mt-6">
        <p>
          <strong>Note:</strong> Data points are approximations based on
          historical literacy rates and societal factors. The economic value
          shows how valuable literacy skills were as a profession (higher means
          more exclusive/valuable). Social utility represents how useful
          literacy was in everyday life. Writing difficulty indicates the effort
          required to produce written content.
        </p>
      </div>
    </div>
  );
};

export default LiteracyTimeline;
