export class ControlTable {
  no: string;
  workDate: string;
  workTime: string;
  employee: string;
  memo: string;
  shortMemo: string;


  constructor(no: string, workDate: string, workTime: string, employee: string, memo: string, shortMemo: string) {
    this.no = no;
    this.workDate = workDate;
    this.workTime = workTime;
    this.employee = employee;
    this.memo = memo;
    this.shortMemo = shortMemo;
  }
}
