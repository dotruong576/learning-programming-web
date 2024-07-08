import { Accordion, AccordionItem } from "@nextui-org/react";

export default function SideMenu() {
  return (
    <div className={"h-fit w-1/4 ps-6"}>
      <Accordion>
        <AccordionItem title="Starting course">
          <div className={"hover:cursor-pointer"}>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </AccordionItem>
        <AccordionItem title="Learning course">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </AccordionItem>
        <AccordionItem title="Ending course">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
