const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
// Array to populated the select tags with these countries
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "KRW", name: "South Korean Won" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "INR", name: "Indian Rupee" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "ZAR", name: "South African Rand" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "THB", name: "Thai Baht" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "PLN", name: "Polish Złoty" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "DKK", name: "Danish Krone" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "QAR", name: "Qatari Rial" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "YER", name: "Yemeni Rial" },
    { code: "KRW", name: "North Korean Won" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "UZS", name: "Uzbekistani Som" },
    { code: "TMT", name: "Turkmen Manat" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "MVR", name: "Maldivian Rufiyaa" },
    { code: "MNT", name: "Mongolian Tugrik" },
    { code: "KPW", name: "North Korean Won" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "LAK", name: "Lao Kip" },
    { code: "MMK", name: "Burmese Kyat" },
    { code: "KHR", name: "Cambodian Riel" },
    { code: "PYG", name: "Paraguayan Guarani" },
    { code: "UZS", name: "Uzbekistani Som" },
    { code: "KGS", name: "Kyrgyzstani Som" },
    { code: "TJS", name: "Tajikistani Somoni" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "YER", name: "Yemeni Rial" },
    { code: "SYP", name: "Syrian Pound" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "QAR", name: "Qatari Rial" },
    { code: "OMR", name: "Omani Rial" },
    { code: "AED", name: "United Arab Emirates Dirham" }
];


countries.forEach(country => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');

  option1.value = option2.value = country.code;
  option1.innerText = option2.innerText = `${country.code} (${country.name})`;

  fromCurrencyElement.appendChild(option1);
  toCurrencyElement.appendChild(option2);
});

// Set default values after the loop
fromCurrencyElement.value = "USD";
toCurrencyElement.value = "INR";

const getExchangeRate = async () => {
  try {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();

    if (!data.rates || !data.rates[toCurrency]) {
      throw new Error('Invalid exchange rate data');
    }

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate);

    convertedAmountElement.value = convertedAmount;
  } catch (error) {
    console.error('Error:', error.message);
    // Handle the error, e.g., display an error message to the user
  }
};

fromAmountElement.addEventListener('input', getExchangeRate);


