import type { App } from 'vue';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';
import { Locale } from 'wot-design-uni';
import enUS from 'wot-design-uni/locale/lang/en-US';
import zhCN from 'wot-design-uni/locale/lang/zh-CN';
import enUSMessage from './modules/en-US.json';
import zhCNMessage from './modules/zh-CN.json';

// 默认使用的语言
const defaultLanguage = 'zh-CN';

const wotLocales = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

/**
 * 获取默认的本地语言
 * @returns 语言
 */
function getDefaultLanguage() {
  const locales = Object.keys(wotLocales);

  const localLanguage = uni.getStorageSync<string>('language') || uni.getLocale();

  // 存在当前语言的语言包 或 存在当前语言的任意地区的语言包
  if (locales.includes(localLanguage))
    return localLanguage;

  // 若未找到，则使用 默认语言包
  return defaultLanguage;
}

/**
 * 加载本地语言包
 * @param locale 语言
 * @param i18n 国际化配置
 */
function loadLocaleMsg(locale: string, i18n: I18n) {
  const messages = {
    'zh-CN': zhCNMessage,
    'en-US': enUSMessage,
  };
  i18n.global.setLocaleMessage(locale, messages[locale as keyof typeof messages]);
}

async function setLang(lang: string, i18n: I18n) {
  loadLocaleMsg(lang, i18n);

  // 设置本地语言
  uni.setLocale(lang);
  uni.setStorageSync('language', lang);
  i18n.global.locale.value = lang;

  // 设置 wot-design-uni 组件语言包
  Locale.use(lang, wotLocales[lang as keyof typeof wotLocales]);
}

/**
 * 初始化国际化
 */
function initI18n() {
  const lang = getDefaultLanguage();
  const i18n = createI18n({
    // 使用 Composition API 模式，则需要将其设置为false
    legacy: false,
    // 全局注入 $t 函数
    globalInjection: true,
    // 使用的语言
    locale: lang,
    // 当前语言翻译缺失时显示的语言
    fallbackLocale: lang,
  });

  setLang(lang, i18n);

  return i18n;
}

const i18n = initI18n();
type I18n = typeof i18n;

export const language = computed({
  get() {
    return i18n.global.locale.value;
  },
  set(lang: string) {
    setLang(lang, i18n);
  },
});

/**
 * 配置i18n国际化
 * @param app vue实例
 */
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export { i18n };
