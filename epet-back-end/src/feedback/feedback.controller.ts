import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }

    @Get('/')
    async showAll() {
        return this.feedbackService.showAll();
    }

    @Get(':id')
    async showById(@Param() id) {
        return this.feedbackService.showById(id);
    }

    @Post('/')
    async createOrder(@Body() data) {
        return this.feedbackService.create(data);
    }

    @Put(':id')
    async updateOrder(@Param() id, @Body() data) {
        return this.feedbackService.update(id, data);
    }

    @Delete(':id')
    async deleteOrder(@Param() id) {
        return this.feedbackService.delete(id);
    }
}
