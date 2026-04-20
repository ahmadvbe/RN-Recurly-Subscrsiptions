import dayjs from "dayjs";

//  1:39:40 need for a currency formatting Function
//       we re dealing with $ amounts 
//       1:40:20 ASK Junie. ==>lib/utils.ts
//1:41:20
export const formatCurrency = (value: number, currency = "USD"): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
};



  // ### 1:58:25  components/SubscriptionCard.tsx
  //   each cad is tappable which extends the cards to show details like payment methood, catgeory , start date, renewal date and status of the subscription
  //   tthen tapping it collapses it 
export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.format("MM/DD/YYYY") : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
