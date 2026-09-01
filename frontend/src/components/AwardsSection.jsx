import React from 'react';

function AwardsSection() {
  return (
    <div id="awards-section">
      <h2 className="fadetxtUp">Experience, Credentials &amp; Certifications</h2>
      <div className="awards-3d-container">
        <img src="/images/compass.png" alt="Technical Achievement" className="emmy-image" id="emmy-image" />
        <div className="awards-stack awards-left">
          <div className="award-card highlight-card">
            <div className="award-card-name">Generation Thailand</div>
            <div className="award-card-project">Junior Software Developer (JSD13)</div>
            <div className="award-card-client">MERN Stack (React, Node, Express, SQL, MongoDB)</div>
            <div className="award-card-year">May 2026 - Aug 2026</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">Full-Stack Web Dev</div>
            <div className="award-card-project">Software Engineering Trainee</div>
            <div className="award-card-client">Agile Sprints, REST APIs, WCAG AA, RBAC</div>
            <div className="award-card-year">2026</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">BYD Auto (Thailand)</div>
            <div className="award-card-project">Production Technician</div>
            <div className="award-card-client">Reduced defects by 10% &amp; Zero downtime</div>
            <div className="award-card-year">2024 - 2026</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">Ford Motor Company</div>
            <div className="award-card-project">Chassis Assembly Technician</div>
            <div className="award-card-client">ISO 9001 Compliance &amp; Diagnostic QC</div>
            <div className="award-card-year">2020 - 2024</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">Thonburi Vocational</div>
            <div className="award-card-project">Higher Vocational Diploma</div>
            <div className="award-card-client">Automotive Technology &amp; Mechanics</div>
            <div className="award-card-year">2020</div>
          </div>
        </div>
        <div className="awards-stack awards-right">
          <div className="award-card highlight-card">
            <div className="award-card-name">MERN Stack &amp; React</div>
            <div className="award-card-project">Full-Stack Development</div>
            <div className="award-card-client">React.js, Node.js, Express.js, MongoDB, SQL</div>
            <div className="award-card-year">2026</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">REST APIs &amp; Architecture</div>
            <div className="award-card-project">Backend &amp; Security</div>
            <div className="award-card-client">JWT Authentication, RBAC, Data Modeling</div>
            <div className="award-card-year">2026</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">National Skill Standard</div>
            <div className="award-card-project">Certified Thai Culinary Chef Level 1</div>
            <div className="award-card-client">Culinary Arts &amp; Precision Skill Standard</div>
            <div className="award-card-year">Certified</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">UI/UX &amp; Motion Design</div>
            <div className="award-card-project">Frontend Engineering</div>
            <div className="award-card-client">GSAP ScrollTrigger, Canvas, Responsive Layouts</div>
            <div className="award-card-year">2026</div>
          </div>
          <div className="award-card">
            <div className="award-card-name">Automotive Diagnostics</div>
            <div className="award-card-project">Engineering Foundation</div>
            <div className="award-card-client">System Optimization &amp; Precision Alignment</div>
            <div className="award-card-year">2020 - 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardsSection;
