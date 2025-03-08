import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  async function handleSubmit(formData: FormData) {
    console.log(Object.fromEntries(formData));
  }

  return (
    <div className="bg-white">
      <main>
        {/* Contact Form */}
        <section className="container py-12 mx-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Liên hệ</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit(new FormData(e.target as HTMLFormElement));
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    required
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="Your message"
                  required
                  className="min-h-[150px] rounded-3xl"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-500 font-bold cursor-pointer rounded-lg"
              >
                SUBMIT
              </Button>
            </form>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="container py-12 mx-auto">
          <div className="flex justify-center gap-12">
            <a href="#" className="flex flex-col items-center gap-2 group">
              <div className="p-4 rounded-full border group-hover:border-[#E88B8C] transition-colors">
                <Facebook className="h-6 w-6 group-hover:text-[#E88B8C]" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-[#E88B8C]">
                Facebook
              </span>
            </a>
            <a href="#" className="flex flex-col items-center gap-2 group">
              <div className="p-4 rounded-full border group-hover:border-[#E88B8C] transition-colors">
                <Instagram className="h-6 w-6 group-hover:text-[#E88B8C]" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-[#E88B8C]">
                Instagram
              </span>
            </a>
            <a href="#" className="flex flex-col items-center gap-2 group">
              <div className="p-4 rounded-full border group-hover:border-[#E88B8C] transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 group-hover:text-[#E88B8C]"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-[#E88B8C]">
                TikTok
              </span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
