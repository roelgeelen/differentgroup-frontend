export class ControlTable {
  id: string;
  no: string;
  workDate: string;
  workTime: string;
  customer: string;
  customerNo: string;
  employee: string;
  memo: string;
  shortMemo: string;
  priorityCode: boolean;


  constructor(id: string, no: string, workDate: string, workTime: string, customer: string, customerNo: string, employee: string, memo: string, shortMemo: string, priorityCode: boolean) {
    this.id = id;
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
