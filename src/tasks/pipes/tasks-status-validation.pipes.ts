import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly AllowedStatus = [
        TaskStatus.OPEN, 
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    private isStatusValid(status: TaskStatus) {
        const valid = this.AllowedStatus.indexOf(status);
        return valid !== -1;
    }

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value))   {
            throw new BadRequestException ('Status is not valid')
        }
        return value
    }
}