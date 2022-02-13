import React from 'react';
import { withGlobalStaticProps } from '../lib/api';

function PrivacyPolicy() {
  return (
    <div className="page-privacy-policy">

      <p>This privacy policy serves as a straightforward explanation of how this website collects and handles your personal information. Please note that the term "this website" encompasses:</p>

      <ul>
        <li>All personal website pages hosted on the <strong>calebevans.me</strong> domain</li>
        <li>All web apps, websites, and other projects hosted on all <strong>*.calebevans.me</strong> subdomains</li>
      </ul>

      <p>This privacy policy was last updated on June 22nd, 2020.</p>

      <h3>Secure Connection</h3>

      <p>Your connection to this website is fully encrypted via HTTPS, including (but not limited to) all stylesheets, scripts, and images. For more comprehensive details, see the <a href="https://www.ssllabs.com/ssltest/analyze.html?d=calebevans.me">SSL Labs report for calebevans.me</a>.</p>

      <h3>Local Storage</h3>

      <p>The apps on this website use the HTML5 Local Storage API to store user-inputted data and preferences. All of this data remains on your computer, and can be cleared through your web browser. The data contains no personally-identifiable information except whatever information you may enter into the app. To be clear,
      however, this data is not sent to anyone.</p>

      <h3>Sharing Features</h3>

      <p>Some of my apps (like <a href="https://projects.calebevans.me/expressions/">Expressions</a>) have sharing features that work by uploading your content to this website's server. This content never leaves the server and is only used to enable this sharing functionality to function.</p>

      <h3>Google Analytics</h3>

      <p>This website uses Google Analytics. I only use this information to examine traffic trends and visitor statistics (i.e. the percentage of Chrome users).
      However, you would need to read the <a href="https://support.google.com/analytics/answer/6004245?hl=en">Google Analytics privacy summary</a>
      to understand how Google collects and uses this information. I do not otherwise share this information.</p>

      <h3>Contacting Me</h3>

      <p>If you choose to email me through this website, I will not share your email with anyone else, nor will I use it for marketing purposes.</p>

      <h3>Changes</h3>

      <p>This privacy policy may change at any time. When changes are made, the date at the top of this policy will be updated.</p>
    </div>
  );
}
export default PrivacyPolicy;

export async function getStaticProps() {
  return withGlobalStaticProps({
    props: {
      title: 'Privacy Policy',
      description: 'The privacy policy for apps crafted by Caleb Evans, coder for Christ'
    }
  });
}
