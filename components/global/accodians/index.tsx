import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <section className="w-[900px] mx-auto text-lg">
      <Accordion type="single" collapsible className="w-full mx-auto">
        <AccordionItem value="item-1" className="border p-2 px-5 rounded-xl">
          <AccordionTrigger className="text-lg">Is it accessible?</AccordionTrigger>
          <AccordionContent className="text-lg">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border p-2 px-5 rounded-xl">
          <AccordionTrigger className="text-lg">Is it styled?</AccordionTrigger>
          <AccordionContent className="text-lg">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border p-2 px-5 rounded-xl">
          <AccordionTrigger className="text-lg">Is it animated?</AccordionTrigger>
          <AccordionContent className="text-lg">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
