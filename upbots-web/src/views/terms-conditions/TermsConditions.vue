<template>
  <div
    class="terms-conditions flex flex-col flex-grow
    pt-30 md:pt-50 px-20 md:px-30 overflow-y-auto custom-scrollbar"
  >
    <div class="flex flex-col items-center justify-center flex-shrink-0 mb-40 md:mb-24">
      <!-- WM (should use h-55) in default mode should change h-50 -->
      <div class="flex w-50 h-50 rounded-full mx-auto mb-5 overflow-hidden">
        <!-- WM -->
        <!-- <img
          src="/img/winter-mode/sidebar-logo-wm.svg"
          alt="Upbots logo WM"
          class="w-full h-full self-center object-cover"
        > -->

        <!-- Default mode -->
        <img
          src="/img/logos/logo.png"
          alt="Upbots logo"
          class="w-full h-full self-center object-cover"
        >
      </div>

      <h1 class="text-center">Terms and Conditions</h1>
    </div>

    <div class="flex flex-col w-full relative pb-20 overflow-y-auto custom-scrollbar">
      <div>
        <ul class="flex flex-col flex-shrink-0 space-y-20">
          <!-- 1 -->
          <li>
            <h2>1. What You Need to Know</h2>

            <p>
              <span>
                The Services do not offer financial advice, the acquisition,
                and sale of financial instruments by us or another user for your
                account, portfolio management, investment management,
                or any consulting or advisory services to you by us or any other user.
                We are also not offering any deposit or custodial services for cryptographic or other assets.
                Upbots is not a bank or financial institution and does not provide financial services or
                financial market infrastructure. We are a software as a service provider that enables a
                platform for users to get consolidated overviews in dashboards of their cryptographic and
                other assets held with third party-exchanges by opening APIs and to access trading signals,
                copy-trading, and trading bots and use such trading tools for the cryptographic and other assets
                held with third party-exchanges via the third-party exchanges APIs.
              </span>
              <span>
                Only you have access to your cryptographic and other assets held with third party-exchanges.
                Viewing your balances of
                cryptographic and other assets in the Services is thus only possible if the third-party
                exchange where you hold your assets offers API access and you granted access to such balances,
                all subject to the terms and conditions of the respective third-party exchange.
              </span>
              <span>
                By using the Services you agree to be bound by these Terms.
                If you do not want to agree to these Terms, you must not access or use the Services.
              </span>
            </p>
          </li>

          <!-- 2 -->
          <li>
            <h2>2. We are Currently in Test-Phase</h2>

            <p>
              The Services are currently in a test phase and not all features are enabled, for example,
              but not limited to giving you the possibility to offer trading signals, copy-trading,
              or trading bots to other users. Due to the nature of testing, features may be changed, extended,
              or removed. You acknowledge that in particular, but not exclusively (see below) in the test phase, the
              risks for errors, inaccuracies failures, corruption or loss of data, or - if you apply trading tools
              to you cryptographic or other assets held with a third party exchange – unwanted transaction regarding
              your cryptographic assets or other assets held with a third party-exchange will be executed, is very high.
              You agree that we are not responsible for any costs, expenses, or other liabilities you may incur as a
              result of your testing, and that also during the test phase, our liability, and that of our parent(s),
              affiliates, related companies, officers, directors, employees, agents, representatives, partners,
              and licensors, is limited to the maximum extent permissible in your country of residence.
            </p>
          </li>

          <!-- 3 -->
          <li>
            <h2>3. Who May Use the Services</h2>

            <p>
              You may use the Services only if you agree to form a binding contract with the UBX Software LLC,
              Saint Vincent, and are not a person barred from receiving services under the laws of the
              applicable jurisdiction. In any case, you must have the legal capacity to form a binding contract
              with us under the page 2 of 5 applicable law. If you are accepting these Terms and using the
              Services on behalf of a company, organization, government, or other legal entity, you warrant
              that you are authorized to do so and have the authority to bind such entity to these Terms,
              in which case the words “you” and “your” as used in these Terms shall refer to such entity.
            </p>
          </li>

          <!-- 4 -->
          <li>
            <h2>4. Privacy</h2>

            <div>
              Our
              <router-link
                tag="span"
                :to="{ name: routeNames.privacyPolicy }"
                class="text-blue-cl-100 cursor-pointer"
              >
                Privacy Policy
              </router-link>
              describes how we handle the information you provide to us when you use our Services.
              You understand that the collection, processing, and use of such information by us and our
              affiliates (as outlined in the Privacy Policy), including the transfer of
              the information to other countries, is required to perform the Services.
            </div>
          </li>

          <!-- 5 -->
          <li>
            <h2>Using the Services</h2>

            <p>
              <span>
                Your use of the Services must not violate any applicable laws, regulations,
                including financial market laws, export control laws, or other laws in your jurisdiction.
                You are responsible for making sure that your use of the Services complies with laws
                and any applicable regulations.
              </span>
              <span>
                You may not use, or encourage, instigate, promote, facilitate, or instruct others to use,
                the Services for any illegal, harmful, fraudulent, or infringing use.
              </span>
              <span>
                Our Services evolve constantly. As such, the Services may change from time to time, at our discretion.
                We may stop (permanently or temporarily) providing the Services or any features within the Services
                to you or to users generally. We also retain the right to create limits on use at our sole discretion
                at any time. We may suspend or terminate users, and reclaim trading tools without liability to you.
              </span>
              <span>
                You agree not to misuse our Services, for example, by interfering with them or
                accessing them using a method other than the interface and the instructions that we provide.
                You may not do any of the following while accessing or using the Services: (i) access, tamper
                with, or use non-public areas of the Services, our computer systems, or the technical delivery systems
                of our providers; (ii) probe, scan, or test the vulnerability of any system or network or breach or
                circumvent any security or authentication measures; (iii) interfere with, or disrupt,
                (or attempt to do so), the access of any user, host or network, including, without limitation,
                sending a virus, overloading, flooding, spamming, mail-bombing the Services. We also reserve
                the right to access, read, preserve, and disclose any information that you have provided in
                connection with the Services as we reasonably believe is necessary to (i) satisfy any applicable
                law, regulation, legal process or governmental request, (ii)  enforce the Terms, including investigation
                of potential violations hereof, (iii) detect, prevent, or otherwise address fraud,
                security or technical issues, (iv) respond to user support requests, or (v) protect the rights,
                property or safety of us, our users and the public. We do not disclose personally-identifying
                information to third parties except according to our Privacy Policy.
              </span>
            </p>
          </li>

          <!-- 6 -->
          <li>
            <h2>Fees we may Charge</h2>

            <p>
              We expressly reserve the right to charge fees for the use of all or specific functions of
              the Services (including additional functionalities added at a later stage), now or in the future.
              Some features of the Services may require the possibility of automated fee collection (direct debit)
              through APIs, which require the use of supported third-party account (wallet) solutions.
              By using any of the supported third- party account (wallet) solutions for automated collection,
              you acknowledge that such solutions are not offered by us, they are governed by separate terms and
              conditions, we do not have control, and we are not responsible for any costs, expenses, other liabilities,
              damages or losses you may incur as a page 3 of 5 result of using such solutions. The support of a specific
              solution is neither a recommendation nor a guarantee or warranty for such a solution.
            </p>
          </li>

          <!-- 7 -->
          <li>
            <h2>Information and Content Available</h2>

            <p>
              <span>
                The Services include information and content from us as well as from websites, databases,
                or platforms offered by independent third parties. Links to such other websites, databases,
                or platforms or information and content from such websites, databases, or platforms are neither
                a recommendation nor a guarantee or warranty and do not mean that we agree with the intended
                usability, contents, functionalities of such websites and platforms.
              </span>
              <span>
                Any use or reliance on any information or content available via the Services - whether provided
                by us or by third-parties -obtained by you through the Services is at your own risk and you acknowledge
                that we exclude all liability to the extent permitted by applicable law. We do not endorse,
                support, represent or guarantee the completeness, truthfulness, accuracy, or
                reliability of any information and content made available via the Services.
              </span>
            </p>
          </li>

          <!-- 8 -->
          <li>
            <h2>Your Account</h2>

            <p>
              <span class="text-chicory-flower dark:text-white">
                You need to create an account to use our Services. You are responsible for safeguarding your account,
                so use a strong password and limit its use to this account. We cannot and will not be liable for any
                loss or damage arising from your failure to comply with the above.
                Your account should be kept personal to you and not shared with other people.
              </span>
              <span class="text-chicory-flower dark:text-white">
                You can control most communications from the Services.
                We may need to provide you with certain communications, such as service announcements and administrative
                messages. These communications are considered part of the Services and your account, and you
                may not be able to opt-out from receiving them.
              </span>
            </p>
          </li>

          <!-- 9 -->
          <li>
            <h2>Your License to Use the Services</h2>

            <p>
              <span>
                We give you a personal, worldwide, royalty-free, non-assignable,
                and non-exclusive license to use the software provided to you
                as part of the Services. This license has the sole purpose of
                enabling you to use and enjoy the benefit of the Services as
                provided by us, in the manner permitted by these Terms.
              </span>
              <span>
                Nothing in the Terms gives you a right to use our name or any of our logos, domain names,
                other distinctive brand features, and other proprietary rights. All right,
                title and interest in and to the Services are and will remain the exclusive property
                of us and our licensors. Any feedback, comments, or suggestions you may provide regarding us
                or the Services is entirely voluntary and we will be free to use such feedback, comments,
                or suggestions as we see fit and without any obligation to you.
              </span>
            </p>
          </li>

          <!-- 10 -->
          <li>
            <h2>Ending These Terms</h2>

            <p>
              <span>
                You may end your legal agreement with us at any time by deactivating
                your accounts and discontinuing your use of the Services.
              </span>
              <span>
                We may suspend or terminate your account or cease providing you with all or part of the
                Services at any time for any or no reason, including, but not limited to, if we reasonably believe:
                (i) you have violated these Terms, (ii) you create risk or possible legal exposure for us; (iii)
                your account should be blocked due to prolonged inactivity; or (iv) our provision of the
                Services to you is no longer commercially viable. We will make reasonable efforts to notify you
                through the Services the next time page 4 of 5 you attempt to access the Services,
                depending on the circumstances. In all such cases, the Terms shall terminate, including, without
                limitation, your license to use the Services, except that the following sections shall continue
                to apply: sections 4, 5, 6, and 7.
              </span>
            </p>
          </li>

          <!-- 11 -->
          <li>
            <h2>Limitations, Release, and Indemnification</h2>

            <p>
              <span>
                By using the Services you agree that our liability, and that of our parent(s),
                affiliates, related companies, officers, directors, employees, agents, representatives,
                partners, and licensors, is limited to the maximum extent permissible in your country of residence.
              </span>
              <span>
                You agree to indemnify us, defend us, and hold us harmless from and against any and all claims,
                liabilities, and expenses, including attorneys' fees, arising out of your use of the Services,
                including but not limited to your violation of these Terms, provided that we (i) promptly
                gives you written notice of the claim, demand, suit or proceeding; (ii) give you sole
                control of the defense and settlement of the claim, demand, suit or proceeding
                (provided that you may not settle any claim, demand, suit or proceeding unless the
                settlement unconditionally releases us of all liability); and (iii) provide to you all
                reasonable assistance, at your expense.
              </span>
            </p>
          </li>

          <!-- 12 -->
          <li>
            <h2>General</h2>

            <p>
              <span>
                We may revise these Terms from time to time. The changes will not be retroactive,
                and the most current version of the Terms,
                which will always be at
                <a
                  href="https://beta.upbots.com/"
                  target="_blank"
                  class="text-bianchi-green font-medium hover:underline"
                >https://beta.upbots.com/</a>, will govern
                our relationship with you. Other than for changes addressing new functions or made for legal reasons,
                we will notify you 30 days in advance of any changes to these Terms that impact the rights or
                obligations of any party to these Terms, for example
                via our website or other communication channels.
                By continuing to access or use the Services after those revisions become
                effective, you agree to be bound by the revised Terms.
              </span>
              <span>
                If any provision of these Terms is held to be invalid or unenforceable,
                then that provision will be limited or eliminated to the minimum extent necessary,
                and the remaining provisions of these Terms will remain in full force and effect. Our failure to
                enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                These Terms are an agreement between you and UBX Software LLC, Saint Vincent.
                If you have any questions about these Terms, please contact
                <a
                  href="mailto:contact@upbots.com"
                  class="text-bianchi-green font-medium hover:underline"
                >contact@upbots.com</a>.
              </span>
              <span>
                These Terms are governed by the laws of Saint Vincent.
                The United Nations Convention on the International Sale of Goods shall not apply.
                Any disputes arising under or in connection with these Terms are subject to the exclusive
                jurisdiction of the courts of Saint Vincent.
              </span>
            </p>
          </li>
        </ul>

        <div class="flex items-center justify-end flex-shrink-0 mt-40">
          <span class="font-semibold">Effective:</span>&nbsp;
          <span class="text-chicory-flower dark:text-white">
            November, 02, 2020
          </span>
        </div>
      </div>

      <!-- REFERRAL TERMS AND CONDITIONS -->
      <h1 class="text-center my-40">Referral Terms and Conditions</h1>
      <ul class="flex flex-col flex-shrink-0 space-y-20">
        <!-- 1 -->
        <li>
          <h2>1. Definitions</h2>

          <p>
            <span>Referrer: an independent party (natural person or legal entity), who registered via www.upbots.com
              website and who introduces clients to the Company platform by sharing their Referral Link.
            </span>
            <span>Referee: a Client who has been introduced to the Company by the Referrer</span>
            <span>Client : any person who signs up to the Company platform.</span>
            <span>Referral Link: a personal and automatically generated unique link to The Company platform personalized
              for each Referrer by the Company. Used to share with potential Clients and to track performance.</span>
            <span>Referrer Account is an independently displayed account which becomes available to the Referrer upon
              signing up to the Referral Program.</span>
          </p>
        </li>

        <!-- 2 -->
        <li>
          <h2>2. Referrer's Obligations</h2>

          <p>
            <span>To comply with these Terms and Conditions that can be amended as The Company sees fit.</span>
            <span>To conduct activities in a professional and appropriate manner and in full compliance with these
              Terms &#38; Conditions.</span>
            <span>To conduct activities in a professional and appropriate manner and in full compliance with these
              Terms &#38; Conditions.</span>
            <span>The Referer, Referee and the Client, in order to participate in the Referral Program, must be over
              18 years of age. </span>
            <span>The Referrer shall not misrepresent The Company and provide true and complete up to date information
              only.</span>
            <span>Under no circumstances The Referrer must make any false and/or misleading representations or
              statements with respect to the Company and/or shall not be engaged, directly or indirectly, in
              activities that the Company considers to be illegal, offensive, unfair or otherwise adverse to
              the reputation of the Company's website.</span>
            <span>You cannot use or register a domain name, keywords or other identifiers for your activities
              with the name of Upbots or similar which may cause any confusion. Should you infringe the
              aforementioned, it will be considered as a material breach of these Terms &#38; Conditions.
            </span>
            <span>Other Rights and Obligations of the Referrer, the Referee, The User as well as those of Upbots.com
              are set forth at:  https://next.upbots.com/terms-conditions</span>
            <span>The Information on how we use, disclose, gather and manage data can be viewed in the
              Privacy Policy : https://next.upbots.com/privacy-policy</span>
          </p>
        </li>

        <!-- 3 -->
        <li>
          <h2>3. Payments</h2>

          <p>
            <span>Reward 1: As Reward 1, the Referrer and the Referee receive 200 virtual UBXT on their accounts
              as soon as the Referee signs up to the Company using the Referrer's link. Those UBXT cannot be withdrawn.
              Those UBXT are the first to be used when the Client adds allocation on a bot. In order to receive the
              Reward 1 both the Referrer and the Referee should have a verified email address. The virtual credit
              is generated instantly providing the Referrer and the Referee have both verified email addresses.
              If they fail to verify their email addresses the Reward 1 will be generated as soon as they do so. </span>
            <span>Reward 2: As Reward 2 the Referrer gets a % of what their Referees paid in performance fees.
              The % depends on the number of Referees the Referrer has:</span>

            <ul class="ml-20">
              <li>1-10 Referees : 2% </li>
              <li>11-50 Referees : 3.5% </li>
              <li>51-200 Referees : 5% </li>
              <li>201-500 Referees : 7.5% </li>
              <li>>500 Referees : 10% </li>
            </ul>

            <span>Reward 2 is to be paid to Referrer's Upbots.com wallet in UBXT. Reward 2 can be withdrawn.
              The Referrer is to receive the Reward 2 as soon as the performance fees are generated on a successful
              trade and paid by the Referee. In order for the Referrer to receive the Reward 2 both the Referrer
              and the Referee should have a verified email address.
            </span>
          </p>
        </li>

        <div class="flex items-center justify-end flex-shrink-0 mt-40">
          <span class="font-semibold">Effective:</span>&nbsp;
          <span class="text-chicory-flower dark:text-white">
            December, 27, 2021
          </span>
        </div>
      </ul>

      <!-- WELCOME BONUS TERMS AND CONDITIONS -->
      <h1 class="text-center my-40">Welcome Bonus Terms and Conditions</h1>
      <p>
        <ul>
          <li>1. Applies only to First Time Depositors</li>
          <li>2. Your Deposit will be doubled up to the amount of 50,000 UBXT</li>
          <li>3. Deposit is a non-withdrawable virtual credit to be used for performance fees only</li>
          <li>4. The offer is limited to only one per individual</li>
        </ul>
      </p>
      <div class="flex items-center justify-end flex-shrink-0 mt-40">
        <span class="font-semibold">Effective:</span>&nbsp;
        <span class="text-chicory-flower dark:text-white">
          February, 7, 2022
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { routeNames } from '@/router'

export default defineComponent({
  name: 'TermsConditions',

  setup () {
    return { routeNames }
  }
})
</script>

<style lang="scss" scoped>
.terms-conditions {
  h1 {
    @apply text-chicory-flower dark:text-white font-medium;
  }

  h2 {
    @apply text-chicory-flower dark:text-white font-semibold;
  }

  p, div {
    @apply text-nile-blue dark:text-blair;
  }

  p {
    @apply space-y-10;
  }

  ul {
    li {
      @apply flex flex-col space-y-10;

      p {
        @apply flex flex-col;
      }
    }
  }

  @media (min-width: 768px) {
    h1 {
      @apply text-5xl;
    }

    h2 {
      @apply text-4xl;
    }

    p, div {
      @apply text-md;
    }
  }

  @media (max-width: 767px) {
    h1 {
      @apply text-4xl;
    }

    h2 {
      @apply text-xl;
    }
  }
}
</style>
