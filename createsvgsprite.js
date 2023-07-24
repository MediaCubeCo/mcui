const fs = require('fs')
const path = require('path')
const svgstore = require('svgstore')

// Конфигурация папок и спрайтов
const icons_folders = ['icons']
const spriteConfigs = icons_folders.map(i_folder => ({
    iconsFolder: `./src/assets/${i_folder}`,
    outputFolder: `./src/assets/`,
    spriteName: `${i_folder}.svg`,
}))

// Создание спрайтов из разных папок
spriteConfigs.forEach(spriteConfig => {
    const { iconsFolder, outputFolder, spriteName } = spriteConfig

    // Создание экземпляра svgstore для каждого спрайта
    const sprites = svgstore()

    // Чтение файлов из папки с иконками
    fs.readdir(iconsFolder, async (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки:', err)
            return
        }

        // Фильтрация файлов только с расширением .svg
        const svgFiles = files.filter(file => path.extname(file) === '.svg')

        // Добавление иконок в спрайт
        svgFiles.forEach(svgFile => {
            const filePath = path.join(iconsFolder, svgFile)
            const iconName = path.basename(svgFile, '.svg')
            const svgContent = fs.readFileSync(filePath, 'utf8')
            sprites.add(iconName, svgContent)
        })

        // Генерация спрайта
        const spriteContent = sprites.toString()

        // Создание файла спрайта
        const outputFilePath = path.join(outputFolder, spriteName)

        if (!fs.existsSync(outputFolder)) await fs.mkdirSync(outputFolder, { recursive: true })
        fs.writeFileSync(outputFilePath, spriteContent)

        console.log('Спрайт успешно создан:', outputFilePath)
    })
})
