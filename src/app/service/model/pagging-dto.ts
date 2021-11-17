export class PaggingDto{
    PageIndex: number;
    PageSize: number;
}

export class GetByUserPagging{
    userId: number;
    condition: PaggingDto;
}