import { ColorType } from "../types/helperTypes";

export function GetRandomColor(): ColorType {
    const colors =
    ['#FF6B6B','#4ECDC4','#45B7D1',
     '#96CEB4','#FFEAA7','#DDA0DD',
     '#FF8A5C','#A29BFE','#FD79A8',
     '#00CEC9','#FDCB6E','#E17055',
     '#74B9FF','#55EFC4','#FAB1A0',
     '#81ECEC'];
    return colors[Math.floor(Math.random() * colors.length)] as ColorType;
}