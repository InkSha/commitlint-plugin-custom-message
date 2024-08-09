import type { Plugin, SyncRule } from '@commitlint/types'
import defaultRules from '@commitlint/rules'

export const CUSTOM_MESSAGE_RULE_SUFFIX = '-message'

export type RuleCustomMessage = Record<`${string}-message`, string>

/**
 * custom message function
 * @param pass lint result
 * @param rule lint rule
 * @param defaultMessage lint rule default message
 * @return custom lint rule message
 */
export type RuleCustomMessageFn = (pass: boolean, rule: string, defaultMessage: string) => string

/**
 * generate wrapper config function
 * @param customMessageConfig custom message config
 * @returns wrapper function
 */
export default (
  customMessageConfig: Record<`${string}${typeof CUSTOM_MESSAGE_RULE_SUFFIX}`, string | RuleCustomMessageFn>,
) => {
  /**
   * user config custom rule message keys
   *
   * @example
   *
   * ```ts
   * ['subject-empty', ...]
   * ```
   */
  const customMessageKeys = Object.keys(customMessageConfig).map((k) => k.slice(0, -CUSTOM_MESSAGE_RULE_SUFFIX.length))

  /**
   * default rule keys
   */
  const ruleConfigKeys = Object.keys(defaultRules)

  /**
   * replace rules
   */
  const pluginConfig: Plugin = {
    rules: {},
  }

  /**
   * user config plugin keys
   *
   * will replace default rules message
   */
  const pluginKeys = ruleConfigKeys.filter((k) => customMessageKeys.includes(k)) as Array<keyof typeof defaultRules>

  // if not user config custom message key, skip
  if (pluginKeys.length) {
    for (const rule of pluginKeys) {
      // replace default lint function

      const handle: SyncRule = (parsed, when, value) => {
        // call default lint function, get lint result
        const [valid, message] = defaultRules[rule](parsed, when, value)

        // get replace message

        const replaceMessage = customMessageConfig[`${rule}${CUSTOM_MESSAGE_RULE_SUFFIX}`]

        if (typeof replaceMessage === 'string') {
          return [valid, replaceMessage]
        }

        return [valid, replaceMessage(valid, rule, message || '')]
      }

      pluginConfig.rules[rule] = handle
    }
  }
  return pluginConfig
}
