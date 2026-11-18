import { fonts } from "./fonts";

export const typography = {
  heading: 26,
  title: 20,
  subtitle: 17,
  body: 16,
  caption: 13,
  amount: 24,

  display: {
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 44,
  },
  headline: {
    fontFamily: fonts.semibold,
    fontSize: 24,
    lineHeight: 36,
  },
  titleLarge: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 32,
  },
  titleMedium: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 26,
  },
  bodyLarge: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 28,
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 24,
  },
  labelLarge: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 24,
  },
  labelSmall: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 20,
  },
} as const;
