import React from "react";
import { useState } from "react";
import Achievement from "./Achievement";

interface Faq {
  question: string;
  answer: string;
}

interface FaqComponentProps {
  faqs: Faq[];
}

const FaqComponent: React.FC<FaqComponentProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(faqs.length);
  return (
    <div className="max-w-md mx-auto">
      <p>
        {" "}
        "Sure, I'd be happy to give you a bit of background. I'm Apollos Severe,
        currently residing in Philadelphia. My professional journey has been
        centered around technology, where I've honed my skills as a Full-Stack
        Software Engineer. Throughout my career, I've worked with a variety of
        programming languages and frameworks, from TypeScript and Java to React
        and Ruby on Rails.
      </p>
      <p>
        {" "}
        My most recent role as a Software Engineer at Luma Financial
        Technologies was particularly enriching. Here, I was deeply involved in
        the development lifecycle, from initial conceptualization to deployment.
        Collaborating closely with cross-functional teams, I led the
        implementation of various features using cutting-edge technologies such
        as React, Redux, and Spring Boot. This experience instilled in me a
        strong sense of ownership and the ability to thrive in fast-paced,
        collaborative environments.{" "}
      </p>
      <p>
        I'm Apollos Severe, I started my working jorney as a Lumber Associate at
        Home Depot. In this role, I developed strategic inventory management
        techniques that resulted in significant reductions in excess stock and
        increases in sales revenue. I also honed my customer service skills,
        consistently achieving high satisfaction ratings while assisting
        customers with their needs.
      </p>
      <p>
        {" "}
        My educational background includes a Bachelor of Science in Computer
        Science from Cairn University. Additionally, I've undertaken various
        personal projects, including the development and deployment of a
        responsive portfolio website to showcase my work. I believe my diverse
        experiences have equipped me with the leadership, problem-solving, and
        adaptability skills necessary to excel as an Amazon Warehouse Area
        Manager. I'm eager to bring my expertise to your team and contribute to
        the continued success of Amazon's operations."{" "}
      </p>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2">
          {/* Add margin-bottom to create space between FAQ items */}
          <button
            className="w-full py-3 px-4 mb-2 text-left rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onClick={() => toggleDropdown(index)}
          >
            {faq.question}
          </button>
          {openIndex === index && (
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-700 mb-4">
                {faq.answer.split("\n").map((paragraph, i) => (
                  <React.Fragment key={i}>
                    {paragraph}
                    <br /> {/* Add line break between paragraphs */}
                  </React.Fragment>
                ))}
              </p>
              <div className="border-t-2 border-gray-300"></div>{" "}
              {/* Add border to create a visible separation */}
            </div>
          )}
        </div>
      ))}
      <div className="p-8">
        <Achievement
          title="Customer Obsession"
          description="As a software engineer at a leading tech firm, I initiated a project to overhaul our customer support portal. Through extensive user research and feedback analysis, I identified pain points and introduced new features such as live chat support and a comprehensive knowledge base. By prioritizing customer needs, I significantly improved the user experience and satisfaction with our support services."
        />
        <Achievement
          title="Ownership"
          description="During a challenging period, I volunteered to lead a cross-functional task force to address declining performance metrics. Despite not being directly responsible for the issue, I took ownership and collaborated with teams across the organization to develop and implement targeted strategies. Through proactive initiatives, we successfully reversed the downward trend and achieved our goals."
        />
        <Achievement
          title="Invent and Simplify"
          description="As a software engineer, I spearheaded the development of a new feature for our mobile app, simplifying the checkout process. By proposing a novel approach that reduced steps required for purchase, we saw a significant increase in conversion rates and customer satisfaction."
        />
        <Achievement
          title="Are Right, A Lot"
          description="In a project to launch a new product line, I sought diverse perspectives from stakeholders across different departments. By actively soliciting feedback and challenging assumptions, we refined our strategy to better meet customer needs, resulting in a successful product launch."
        />
        <Achievement
          title="Learn and Be Curious"
          description="While working as a software engineer, I continuously sought opportunities to expand my knowledge and skills. By enrolling in online courses and participating in training programs, I enhanced my capabilities and contributed more effectively to my team."
        />
        <Achievement
          title="Hire and Develop the Best"
          description="As a software engineering manager, I implemented a rigorous interview process to identify top talent for our team. By emphasizing technical proficiency and potential for growth, we attracted exceptional candidates who became key contributors to our projects."
        />
        <Achievement
          title="Insist on the Highest Standards"
          description="As a project lead, I maintained a relentless focus on quality throughout the development process. By setting high standards for code quality and user experience, we delivered a product that exceeded expectations."
        />
        <Achievement
          title="Think Big"
          description="In a brainstorming session with my team, I proposed a bold initiative to expand our market presence. By articulating a compelling vision, I inspired my colleagues to explore new growth opportunities."
        />
        <Achievement
          title="Bias for Action"
          description="When faced with a critical issue impacting production timelines, I immediately convened a crisis response team to address the situation. By prioritizing speed and agility, we minimized downtime and prevented further disruptions."
        />
        <Achievement
          title="Frugality"
          description="As a project manager, I implemented cost-saving measures to optimize our budget without compromising quality. By negotiating contracts and eliminating unnecessary expenses, we completed the project under budget."
        />
        <Achievement
          title="Earn Trust"
          description="In a leadership role, I prioritized transparent communication and fostered an environment of trust among team members. By addressing concerns openly, I earned the trust and confidence of my colleagues."
        />
        <Achievement
          title="Dive Deep"
          description="As a product manager, I conducted in-depth market research to inform our product development strategy. By staying connected to industry trends, I gained valuable insights that guided our roadmap."
        />
        <Achievement
          title="Have Backbone; Disagree and Commit"
          description="During a strategic planning meeting, I respectfully challenged a proposed course of action. After thorough discussion, the team agreed to modify the strategy based on my recommendations."
        />
        <Achievement
          title="Deliver Results"
          description="In a project to streamline operations, I set ambitious goals and achieved significant cost savings for the company."
        />
        <Achievement
          title="Strive to be Earth's Best Employer"
          description="As a team leader, I prioritized creating a positive work environment where employees felt valued and supported."
        />
        <Achievement
          title="Success and Scale Bring Broad Responsibility"
          description="As a senior leader, I championed corporate social responsibility initiatives aimed at reducing our environmental impact and giving back to the community."
        />
      </div>
    </div>
  );
};

export default FaqComponent;
