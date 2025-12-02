import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Last Updated: 12/02/2025</p>

      <p className="mb-4">
        Welcome to <strong>TrainDesk</strong>. We are committed to protecting your personal information and
        respecting your privacy. This Privacy Policy explains how we collect,
        use, and protect data when you use our platform, including our admin
        dashboard, employee dashboard, SOP management, and training video
        system.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1. Information We Collect
      </h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        1.1 Information You Provide
      </h3>
      <p className="mb-4">
        We collect information that you directly share with us, including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Account information such as name, email, password, and role.</li>
        <li>
          Organizational details such as business name and employee structure.
        </li>
        <li>
          SOPs, training videos, titles, descriptions, and any uploaded content.
        </li>
        <li>Messages or support queries sent by you.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">
        1.2 Information Collected Automatically
      </h3>
      <p className="mb-4">
        When you access the platform, we automatically collect:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Device information (browser, OS)</li>
        <li>Usage logs and page interactions</li>
        <li>Login history and activity patterns</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">We use the data we collect to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide and manage platform access</li>
        <li>Authenticate users securely using Firebase</li>
        <li>Enable role-based access (admin & employee)</li>
        <li>Allow admins to upload and assign training videos & SOPs</li>
        <li>Let employees view only content assigned to them</li>
        <li>Improve platform performance and security</li>
        <li>Provide customer support</li>
        <li>Analyze usage for product enhancement</li>
      </ul>
      <p className="mb-4 font-medium">We never sell your data.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3. Role-Based Data Access
      </h2>

      <h3 className="text-xl font-semibold mt-4 mb-2">Admins</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>Manage employees</li>
        <li>Upload and assign SOPs & training videos</li>
        <li>View reports and activity logs</li>
        <li>Access all organization-level content</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Employees</h3>
      <ul className="list-disc ml-6 mb-4">
        <li>See only assigned training videos</li>
        <li>See only assigned SOPs</li>
        <li>Cannot access admin features or other employees’ data</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4. How We Protect Your Information
      </h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Encrypted HTTPS data transfer</li>
        <li>Secure Firebase authentication</li>
        <li>Role-based access restrictions</li>
        <li>Encrypted storage of sensitive information</li>
        <li>Regular monitoring for suspicious activity</li>
      </ul>

      <p className="mb-4">
        While we take strong measures, no system is fully secure. We encourage
        users to safeguard their login credentials.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Data Sharing</h2>
      <p className="mb-4">
        We do not share your personal data with third parties except:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Service providers such as Firebase and hosting platforms</li>
        <li>Legal authorities, when required by law</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Data Retention</h2>
      <p className="mb-4">
        We store your data as long as your account remains active or as needed
        to provide our services. You may request deletion at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Your Rights</h2>
      <p className="mb-4">You may request to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Access your personal information</li>
        <li>Correct or delete your data</li>
        <li>Export your data</li>
        <li>Limit certain types of processing</li>
      </ul>
      <p className="mb-4">Contact us at: <strong>hibon.technologies@gmail.com</strong></p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        8. Cookies & Tracking
      </h2>
      <p className="mb-4">
        We use cookies for login sessions, analytics, and improving user
        experience. Disabling cookies may affect platform functionality.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        9. Third-Party Services
      </h2>
      <p className="mb-4">
        We integrate with Firebase Authentication, Firestore, and other tools.
        These services have their own privacy policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        10. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy occasionally. The new version will be
        posted with an updated date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">11. Contact Us</h2>
      <p className="mb-4">
        For questions or concerns, please email us at:{" "}
        <strong>hibon.technologies@gmail.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
