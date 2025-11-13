// src/app/contact/page.tsx (NEW FILE)
import { PageContent } from "@/components/PageContent";

export default function ContactUsPage() {
  return (
    <PageContent title="Contact Us">
      <p>You can reach us at <a href="mailto:contact@hiremeup.com" className="text-purple-400 hover:underline">contact@hiremeup.com</a></p>
    </PageContent>
  );
}