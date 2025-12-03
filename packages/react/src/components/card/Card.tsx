// Card: container component with header, body, and footer.

export interface CardProps {
  /** Card contents. */
  children?: unknown;
  /** Additional CSS class. */
  className?: string;
  /** Whether the card has a border. @default true */
  bordered?: boolean;
  /** Whether the card has a shadow. @default true */
  shadow?: boolean;
  /** Padding size. @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

/**
 * Card container component.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardBody>Content here</CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 */
export function Card({
  children,
  className = "",
  bordered = true,
  shadow = true,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg overflow-hidden
        ${bordered ? "border border-gray-200" : ""}
        ${shadow ? "shadow-sm" : ""}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Sub-components
export interface CardHeaderProps {
  children?: unknown;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`px-4 py-3 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export interface CardTitleProps {
  children?: unknown;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export interface CardBodyProps {
  children?: unknown;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export interface CardFooterProps {
  children?: unknown;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`px-4 py-3 border-t border-gray-100 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}
