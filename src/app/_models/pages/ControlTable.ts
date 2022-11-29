export class ControlTable {
  no: string;
  workDate: string;
  workTime: string;
  customer: string;
  customerNo: string;
  employee: string;
  memo: string;
  shortMemo: string;
  priorityCode: boolean;


  constructor(no: string, workDate: string, workTime: string, customer: string, customerNo: string, employee: string, memo: string, shortMemo: string, priorityCode: boolean) {
    this.no = no;
    this.workDate = workDate;
    this.workTime = workTime;
    this.customer = customer;
    this.customerNo = customerNo;
    this.employee = employee;
    this.memo = memo;
    this.shortMemo = shortMemo;
    this.priorityCode = priorityCode;
  }
}
