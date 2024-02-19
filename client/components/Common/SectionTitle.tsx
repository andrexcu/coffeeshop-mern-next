import React from "react";
import "./sectionTitle.css";

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="section-title gap-y-2">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
