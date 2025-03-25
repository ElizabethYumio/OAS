import { TITLE_HEADER_WITH_BUTTON } from "@/common/constants";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function SharedCard({
  children,
  className,
  header,
  onClick,
  title,
  subtitle,
  backNav,
  unstyled,
}) {
  const router = useRouter();

  function renderBackNav() {
    if (backNav) {
      return (
        <Button
          size="small"
          icon="pi pi-arrow-left"
          className="ml-3 h-3rem my-auto p-0 p-button-text text-black-alpha-90 hover:bg-black-alpha-10 align-top"
          onClick={() => router.back()}
        />
      );
    }
  }

  function renderTitle() {
    return (
      <div className="flex p-card-title -mb-5">
        {renderBackNav()}
        <div className={TITLE_HEADER_WITH_BUTTON.OUTER_DIV_CLASS}>
          <h3 className={TITLE_HEADER_WITH_BUTTON.H3_CLASS}>{title}</h3>
        </div>
      </div>
    );
  }

  function renderHeader() {
    return (
      <div className="flex p-card-title -mb-5">
        {renderBackNav()}
        {header}
      </div>
    );
  }

  return (
    <Card
      unstyled={unstyled}
      subTitle={subtitle}
      header={title ? renderTitle() : header && renderHeader()}
      onClick={onClick}
      className={`bg-white border-1 border-round border-gray-300 shadow-none ${className}`}
    >
      {children}
    </Card>
  );
}
