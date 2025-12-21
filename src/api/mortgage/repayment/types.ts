/**
 * 房贷还款实体
 */
export interface MortgageRepaymentEntity {
  /**
   * 主键ID
   */
  id?: number;

  /**
   * 用户ID
   */
  userId?: number;

  /**
   * 用户昵称
   */
  userNickName?: string;

  /**
   * 贷款类型：1-公积金贷款 2-商业贷款 3-组合贷款
   */
  loanType?: number;

  /**
   * 还款期数
   */
  repaymentPeriod?: number;

  /**
   * 实际还款日期（格式建议：YYYYMMDD 数字格式，如20251220）
   */
  actualRepaymentDate?: number;

  /**
   * 实际还款本金
   */
  actualPrincipal?: number;

  /**
   * 实际还款利息
   */
  actualInterest?: number;

  /**
   * 实际支付的逾期费用
   */
  actualOverdueFee?: number;

  /**
   * 实际还款总金额（自动计算）
   */
  actualTotal?: number;

  /**
   * 还款后当前剩余贷款本金金额
   */
  remainingLoanAmount?: number;

  /**
   * 还款方式：银行卡、支付宝、微信等
   */
  paymentMethod?: string;

  /**
   * 支付单号/银行流水号
   */
  paymentNo?: string;

  /**
   * 当前实际使用的贷款利率百分比，如：3.5%
   */
  actualLPR?: number;

  /**
   * 当前实际使用的基点，如：-30‱（注意：1个基点=0.01%，1‱=0.001%）
   */
  actualBP?: number;

  /**
   * 当前实时的贷款利率百分比，如：3.5%
   */
  realtimeLPR?: number;

  /**
   * 当前实时的基点，如：-30‱
   */
  realtimeBP?: number;

  /**
   * 备注（如：提前还款、组合贷公积金部分等）
   */
  remark?: string;

  /**
   * 记录创建时间（只读）
   */
  created?: string;

  /**
   * 记录更新时间（只读）
   */
  updated?: string;
}

/**
 * 用于创建/更新的DTO类型（移除只读字段和主键）
 */
export interface MortgageRepaymentDTO {
  /**
   * 用户ID
   */
  userId?: number;

  /**
   * 用户昵称
   */
  userNickName?: string;

  /**
   * 贷款类型：1-公积金贷款 2-商业贷款 3-组合贷款
   */
  loanType?: number;

  /**
   * 还款期数
   */
  repaymentPeriod?: number;

  /**
   * 实际还款日期（格式建议：YYYYMMDD 数字格式，如20251220）
   */
  actualRepaymentDate?: number;

  /**
   * 实际还款本金
   */
  actualPrincipal?: number;

  /**
   * 实际还款利息
   */
  actualInterest?: number;

  /**
   * 实际支付的逾期费用
   */
  actualOverdueFee?: number;

  /**
   * 还款后当前剩余贷款本金金额
   */
  remainingLoanAmount?: number;

  /**
   * 还款方式：银行卡、支付宝、微信等
   */
  paymentMethod?: string;

  /**
   * 支付单号/银行流水号
   */
  paymentNo?: string;

  /**
   * 当前实际使用的贷款利率百分比，如：3.5%
   */
  actualLPR?: number;

  /**
   * 当前实际使用的基点，如：-30‱
   */
  actualBP?: number;

  /**
   * 当前实时的贷款利率百分比，如：3.5%
   */
  realtimeLPR?: number;

  /**
   * 当前实时的基点，如：-30‱
   */
  realtimeBP?: number;

  /**
   * 备注（如：提前还款、组合贷公积金部分等）
   */
  remark?: string;
}

/**
 * 贷款类型枚举
 */
export enum LoanTypeEnum {
  /** 商业贷款 */
  COMMERCIAL = 1,
  /** 公积金贷款 */
  PUBLIC_FUND = 2,
  /** 组合贷款 */
  COMBINATION = 3
}

export const LoanTypeLabelMap: { [key: number]: string } = {
  [LoanTypeEnum.COMMERCIAL]: '商业贷款',
  [LoanTypeEnum.PUBLIC_FUND]: '公积金贷款',
  [LoanTypeEnum.COMBINATION]: '组合贷款'
};

export const getLoanTypeLabel = (loanType?: number): string => {
  // 处理空值/无效值
  if (!loanType || !LoanTypeLabelMap[loanType]) {
    return '未知类型';
  }
  return LoanTypeLabelMap[loanType];
};