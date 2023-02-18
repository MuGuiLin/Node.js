import { Global, Module } from '@nestjs/common';
import { CoreController } from './controllers';
import { CoreService } from './service';

@Global() //通过@Global()装饰器，向全局暴露这个Coer（作为公共核心Module），这样就不用在要引用的模块的module中的imports、provides中导入了，就可以直接在对应的controller中使用引用 在下面exports中导出的controllers、service等模块啦！
@Module({
    imports: [],

    controllers: [CoreController],

    providers: [CoreService],

    // 要暴露的公共模块
    exports: [
        // CoreController,
        CoreService
    ]
})
export class CoreModule { }
