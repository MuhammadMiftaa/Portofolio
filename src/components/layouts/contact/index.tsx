import Footer from "@/components/template/footer";
import AnimatedGradientTextWithoutBorder from "@/components/ui/animated-gradient-text-without-border";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { FormEvent, useState } from "react";
import { isEmail } from "validator";

export default function ContactLayout() {
  const [userForm, setUserForm] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isEmail(userForm.Email)) {
      alert("Please enter a valid email address.");
      e.preventDefault();
      return;
    }
    if (userForm.Name.trim() === "" || userForm.Message.trim() === "") {
      alert("Please fill in all required fields.");
      e.preventDefault();
      return;
    }
  };

  return (
    <div
      className="h-[50rem] pt-6 mt-10 pb-10 px-6 md:px-24 w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center"
      id="contact"
    >
      <div className="w-fit mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent">
        <AnimatedGradientTextWithoutBorder className="">
          <span
            className={cn(
              `text-3xl sm:text-4xl md:text-5xl py-1 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Let's Connect
          </span>
        </AnimatedGradientTextWithoutBorder>
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <form
        className="w-full font-urbanist"
        action={"https://formsubmit.co/6c91f309459feb13239c2c2e66a72136"}
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
        <LabelInputContainer className="mb-4">
          <Label
            className="text-lg md:text-xl -mb-1 md:mb-0 font-light z-10 text-gray-400"
            htmlFor="name"
          >
            Name
          </Label>
          <Input
            className="text-lg"
            id="name"
            name="name"
            required
            type="text"
            onChange={(e) => setUserForm({ ...userForm, Name: e.target.value })}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label
            className="text-lg md:text-xl -mb-1 md:mb-0 font-light z-10 text-gray-400"
            htmlFor="email"
          >
            Email Address
          </Label>
          <Input
            className="text-lg"
            id="email"
            name="email"
            required
            type="email"
            onChange={(e) =>
              setUserForm({ ...userForm, Email: e.target.value })
            }
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label
            className="text-lg md:text-xl -mb-1 md:mb-0 font-light z-10 text-gray-400"
            htmlFor="subject"
          >
            Subject
          </Label>
          <Input
            className="text-lg"
            id="subject"
            name="subject"
            required
            type="text"
            onChange={(e) =>
              setUserForm({ ...userForm, Subject: e.target.value })
            }
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label
            className="text-lg md:text-xl -mb-1 md:mb-0 font-light z-10 text-gray-400"
            htmlFor="message"
          >
            Your message
          </Label>
          <Textarea
            className="text-lg"
            id="message"
            name="message"
            required
            rows={5}
            onChange={(e) =>
              setUserForm({ ...userForm, Message: e.target.value })
            }
          />
        </LabelInputContainer>
        <input
          type="hidden"
          name="_subject"
          value={`MIFTDEV | ${userForm.Subject} from ${userForm.Name} - ${userForm.Email}`}
        />{" "}
        {/* Subject Email */}
        <input type="hidden" name="_next" value="https://miftdev.my.id" />{" "}
        {/* Redirect URL after submission */}
        <input type="text" name="_honey" className="hidden" />{" "}
        {/* Honeypot for spam */}
        <input type="hidden" name="_captcha" value="false" />{" "}
        {/* Disable captcha */}
        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-gray-400 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Send message
          <BottomGradient />
        </button>
      </form>
      <Footer />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-[3px] w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-color-1 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-[3px] w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-color-1 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className={cn("flex flex-col space-y-2 w-full", className)}
    >
      {children}
    </div>
  );
};
