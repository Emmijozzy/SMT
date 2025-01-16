import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SocialLink } from "./SocialLink";
import { SocialLinksProps } from "../types";

function SocialLinks({ socialLinks }: { socialLinks: SocialLinksProps }) {
  return (
    <div className="flex w-full items-center border-base-content">
      <div className="flex gap-4 ml-auto mr-2 mt-2">
        <SocialLink icon={WhatsAppIcon} url={socialLinks?.whatsappLink} label="Whatsapp" />
        <SocialLink icon={FacebookIcon} url={socialLinks?.facebookLink} label="Facebook" />
        <SocialLink icon={LinkedInIcon} url={socialLinks?.linkedInLink} label="LinkedIn" />
      </div>
    </div>
  );
}
export default SocialLinks;
