export interface PricingCardProps {
  /** Pricing card title */
  title: string;
  /** Service cost */
  price: number | string;
  /** Benefits list */
  benefits: string[];
  /** Button text */
  buttonText: string;
  /** Button URL */
  buttonUrl: string;
}
