export const gradientBgBase = "bg-gradient-to-tr";
export const gradientBgPurplePink = `${gradientBgBase} from-purple-400 via-pink-500 to-red-500`;
export const gradientBgDark = `${gradientBgBase} from-slate-700 via-slate-700 to-slate-600`;
export const gradientBgPinkRed = `${gradientBgBase} from-pink-400 via-red-500 to-yellow-500`;

export const colorsBgLight = {
  white: "bg-white text-black",
  light: "bg-white text-black dark:bg-slate-700/70 dark:text-white",
  contrast: "bg-gray-800 text-white dark:bg-white dark:text-black",
  success: "bg-emerald-400 border-emerald-500 text-white",
  danger: "bg-rose-400 border-rose-500 text-white",
  warning: "bg-yellow-400 border-yellow-500 text-white",
  info: "bg-sky-400 border-sky-400 text-white",
  actlike: "bg-indigo-400 border-indigo-400 text-white",
};

export const colorsText = {
  white: "text-black dark:text-slate-100",
  light: "text-gray-700 dark:text-slate-400",
  contrast: "dark:text-white",
  success: "text-emerald-400",
  danger: "text-rose-400",
  warning: "text-yellow-400",
  info: "text-sky-400",
  actlike: "bg-indigo-400 border-indigo-400 text-white",
};

export const colorsOutline = {
  white: [colorsText.white, "border-gray-100"],
  light: [colorsText.light, "border-gray-100"],
  contrast: [colorsText.contrast, "border-gray-900 dark:border-slate-100"],
  success: [colorsText.success, "border-emerald-500"],
  danger: [colorsText.danger, "border-rose-500"],
  warning: [colorsText.warning, "border-yellow-500"],
  info: [colorsText.info, "border-sky-300"],
  actlike: [colorsText.actlike, "border-indigo-400"],
};

export const getButtonColor = (
  color,
  isOutlined,
  hasHover,
  isActive = false
) => {
  const colors = {
    ring: {
      white: "ring-gray-200 dark:ring-gray-500",
      whiteDark: "ring-gray-200 dark:ring-gray-500",
      lightDark: "ring-gray-200 dark:ring-gray-500",
      contrast: "ring-gray-300 dark:ring-gray-400",
      success: "ring-emerald-300 dark:ring-emerald-700",
      danger: "ring-rose-300 dark:ring-rose-700",
      warning: "ring-yellow-300 dark:ring-yellow-700",
      info: "ring-sky-300 dark:ring-sky-700",
      actlike: "ring-indigo-300 dark:ring-indigo-700",
    },
    active: {
      white: "bg-gray-100",
      whiteDark: "bg-gray-100 dark:bg-slate-800",
      lightDark: "bg-gray-200 dark:bg-slate-700",
      contrast: "bg-gray-700 dark:bg-slate-100",
      success: "bg-emerald-600 dark:bg-emerald-600",
      danger: "bg-rose-600 dark:bg-rose-600",
      warning: "bg-yellow-600 dark:bg-yellow-600",
      info: "bg-sky-600 dark:bg-sky-600",
      actlike: "bg-indigo-600 dark:bg-indigo-600",
    },
    bg: {
      white: "bg-white text-black",
      whiteDark: "bg-white text-black dark:bg-slate-900 dark:text-white",
      lightDark: "bg-gray-100 text-black dark:bg-slate-100 dark:text-white",
      contrast: "bg-gray-800 text-white dark:bg-white dark:text-black",
      success: "bg-emerald-500 dark:bg-emerald-500 text-white",
      danger: "bg-rose-500 dark:bg-rose-500 text-white",
      warning: "bg-yellow-600 dark:bg-yellow-500 text-white",
      info: "bg-sky-500 dark:bg-sky-500 text-white",
      actlike: "bg-indigo-500 dark:bg-indigo-500 text-white",
    },
    bgHover: {
      white: "hover:bg-gray-100",
      whiteDark: "hover:bg-gray-100 hover:dark:bg-slate-800",
      lightDark: "hover:bg-gray-200 hover:dark:bg-slate-700",
      contrast: "hover:bg-gray-700 hover:dark:bg-slate-100",
      success:
        "hover:bg-emerald-600 hover:border-emerald-600 hover:dark:bg-emerald-600 hover:dark:border-emerald-600",
      danger:
        "hover:bg-rose-600 hover:border-rose-600 hover:dark:bg-rose-500 hover:dark:border-rose-600",
      warning:
        "hover:bg-yellow-700 hover:border-yellow-700 hover:dark:bg-yellow-500 hover:dark:border-yellow-600",
      info: "hover:bg-sky-600 hover:border-sky-600 hover:dark:bg-sky-600 hover:dark:border-sky-600",
      actlike:
        "hover:bg-indigo-600 hover:border-indigo-600 hover:dark:bg-indigo-600 hover:dark:border-indigo-600",
    },
    borders: {
      white: "border-white",
      whiteDark: "border-white dark:border-slate-900",
      lightDark: "border-gray-100 dark:border-slate-800",
      contrast: "border-gray-800 dark:border-white",
      success: "border-emerald-500 dark:border-emerald-500",
      danger: "border-rose-600 dark:border-rose-500",
      warning: "border-yellow-600 dark:border-yellow-600",
      info: "border-sky-600 dark:border-sky-500",
      actlike: "border-indigo-600 dark:border-indigo-500",
    },
    text: {
      contrast: "dark:text-slate-100",
      success: "text-emerald-600 dark:text-emerald-500",
      danger: "text-rose-600 dark:text-rose-500",
      warning: "text-yellow-600 dark:text-yellow-500",
      info: "text-sky-600 dark:text-sky-500",
    },
    outlineHover: {
      contrast:
        "hover:bg-gray-800 hover:text-gray-100 hover:dark:bg-slate-100 hover:dark:text-black",
      success:
        "hover:bg-emerald-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-emerald-600",
      danger:
        "hover:bg-rose-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-rose-600",
      warning:
        "hover:bg-yellow-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-yellow-600",
      info: "hover:bg-sky-600 hover:text-white hover:dark:text-white hover:dark:border-sky-600",
      actlike:
        "hover:bg-indigo-600 hover:text-white hover:dark:text-white hover:dark:border-indigo-600",
    },
  };

  if (!colors.bg[color]) {
    return color;
  }

  const isOutlinedProcessed =
    isOutlined && ["white", "whiteDark", "lightDark"].indexOf(color) < 0;

  const base = [colors.borders[color], colors.ring[color]];

  if (isActive) {
    base.push(colors.active[color]);
  } else {
    base.push(isOutlinedProcessed ? colors.text[color] : colors.bg[color]);
  }

  if (hasHover) {
    base.push(
      isOutlinedProcessed ? colors.outlineHover[color] : colors.bgHover[color]
    );
  }

  return base;
};