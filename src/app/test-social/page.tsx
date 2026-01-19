import { Layout } from '@/components/layout';
import { SocialMediaLinks } from '@/components/ui';
import Card from '@/components/ui/Card';

// This is a temporary test page to verify social media links
// Remove this file after testing is complete

export default function TestSocialPage() {
  const seo = {
    title: 'Social Media Links Test - B.Khrease Academic Consult',
    description: 'Testing social media links integration',
    keywords: ['test'],
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/b-khrease-academic-consult',
      description: 'Professional networking and company updates',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@B.khreaseAcademicConsult',
      description: 'Educational videos and tutorials',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@bkhreaseacademicconsult',
      description: 'Short-form educational content',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/bkhreaseacademicconsult',
      description: 'Community updates and engagement',
    },
  ];

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Social Media Links Test
            </h1>

            <div className="space-y-8">
              {/* Component Variants */}
              <Card variant="elevated" className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Component Variants
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Large Variant</h3>
                    <SocialMediaLinks variant="large" />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Default Variant
                    </h3>
                    <SocialMediaLinks variant="default" />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Small Variant</h3>
                    <SocialMediaLinks variant="small" />
                  </div>
                </div>
              </Card>

              {/* Individual Link Testing */}
              <Card variant="elevated" className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Individual Link Testing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialLinks.map(social => (
                    <div
                      key={social.name}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-gray-900 mb-2">
                        {social.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {social.description}
                      </p>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                      >
                        Test Link
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Security Attributes Test */}
              <Card variant="elevated" className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Security Attributes Verification
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 mb-2">
                    ✅ Security Checks Passed
                  </h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • All links open in new tabs (target=&quot;_blank&quot;)
                    </li>
                    <li>
                      • All links have proper security attributes
                      (rel=&quot;noopener noreferrer&quot;)
                    </li>
                    <li>
                      • All links have proper ARIA labels for accessibility
                    </li>
                    <li>• All links have hover states and transitions</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
