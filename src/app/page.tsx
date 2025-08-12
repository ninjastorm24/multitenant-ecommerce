import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button variant="secondary">Secondary Button</Button>
      <Button>Primary Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Button</Button>
    </div>
  );
}
