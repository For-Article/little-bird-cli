
import symbol from 'log-symbols';
import chalk from 'chalk';
import ora from 'ora';

import {
    notExistFold,
    prompt,
    downloadTemplate,
    updateJsonFile
} from './util';

let create = async (ProjectName) => {

    // 项目名不能为空
    if (ProjectName === undefined) {
        console.log(symbol.error, chalk.red('创建项目的时候，请输入项目名'));
    } else {
        // 如果文件名不存在则继续执行,否则退出
        notExistFold(ProjectName).then(() => {

            // 用户询问交互
            prompt().then((answer) => {

                // 目前只建了一个vue的模板，所以只能先跳过react🌶 
                if (answer.frame === 'react') {
                    console.log(symbol.warning, chalk.yellow('react模板还在路上，莫急莫急~'));
                    process.exit(1);
                }

                /**
                 * 根据用户输入的配置信息下载模版&更新模版配置
                 * 下载模版比较耗时,这里通过ora插入下载loading, 提示用户正在下载模版
                 */
                let loading = ora('模板下载中...');
                loading.start('模板下载中...');

                let Api = '';
                switch (answer.frame) {
                    case 'vue':
                        Api = 'direct:https://github.com/For-Article/vue-temlate.git';
                        break;
                    case 'react':
                        Api = 'direct:https://github.com/LuoYangYY/react-template.git';
                        break;
                    default:
                        break;
                }

                downloadTemplate(ProjectName, Api)
                .then(() => {

                    loading.succeed('模板下载完成');

                    // 下载完成后,根据用户输入更新配置文件
                    const fileName = `${ProjectName}/package.json`;
                    answer.name = ProjectName;
                    updateJsonFile(fileName, answer)
                    .then(() => {
                        console.log(symbol.success, chalk.green('配置文件更新完的。'));
                    })
                }, () => {
                    loading.fail('模板下载失败');
                });
            })
        });
    }
};

module.exports = create;

