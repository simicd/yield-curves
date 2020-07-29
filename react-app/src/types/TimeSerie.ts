import { Serie } from "@nivo/line";

/**
 * nivo Serie type with mandatory date field
 */
export interface TimeSerie extends Serie {
  /** Serie date */
  date: Date
}