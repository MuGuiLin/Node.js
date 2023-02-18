import { Controller, Get } from '@nestjs/common';
import { CoreService } from './service';

@Controller('core')
export class CoreController {
    constructor(private readonly coreService: CoreService) { }

    @Get()
    getCore(): string {
        return this.coreService.getCore();
    };

    @Get('/all')
    getAllCore(): string {
        return this.coreService.getAllCore();
    }
}
