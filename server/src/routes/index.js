import Router from 'koa-router'

const router = new Router();
router.prefix('/index')

router.get('/', async (ctx) => {
    ctx.body = {
        data: {
          name: '张三',
          age: 20
        }
    };
})

export default router