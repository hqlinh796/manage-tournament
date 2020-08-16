const {sequelize} = require('../models');
const db = require('../models');
const fs = require('fs');


const muHome = 'https://e7.pngegg.com/pngimages/859/107/png-clipart-t-shirt-sleeve-majestic-athletic-jersey-manchester-united-tshirt-logo.png',
      muGuest = 'https://www.goaljerseys.cn/html/upload/item_img/202007/106113/91593738688feaea037.png',
      muLogo = 'https://pluspng.com/img-png/manchester-united-logo-png-download-1280.png',
      chelHome = 'https://footballshirtsdirectuk.com/wp-content/uploads/2015/07/kids_chelsea_home19.jpg',
      chelGuest = 'https://www.kindpng.com/picc/m/590-5904690_chelsea-away-jersey-2017-18-chelsea-kit-2018.png',
      chelLogo = 'https://img2.pngio.com/chelsea-fc-logo-vector-eps-free-download-chelsea-fc-logo-png-300_300.png',
      mcHome = 'https://www.cfb3.net/images/Premier/ManchesterCity/manchester-city-18-19-home-men-soccer-jersey-silva-21_02.png',
      mcGuest = 'https://www.amo-jerseys.com/wp-content/uploads/Manchester-City-Shirt-3rd-Senior-2019-2020.jpg',
      mcLogo = 'https://pluspng.com/img-png/manchester-city-logo-png-manchester-city-supporters-club-logo-410.png';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        
        try {
            
            const roles = await db.roles.bulkCreate([{
                code: 'super_admin',
                name: 'Super admin'
            }, {
                code: 'team_manager',
                name: 'Team manager'
            }, {
                code: 'tournament_manager',
                name: 'Tournament manager'
            }], {
                transaction
            });

            const accounts = await db.accounts.bulkCreate([{
                username: 'teammanager1',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager2',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager3',
                password: '12$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC3456',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager4',
                password: '12$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC3456',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager5',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager6',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager7',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager8',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager9',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'teammanager10',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'team_manager'
            }, {
                username: 'superadmin',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'super_admin'
            }
            , {
                username: 'tournamentmanager',
                password: '$2b$10$LVuAzwcISedTKx13Aqc8xuKVMVjqUxR4YWYbEh/6lAbAupS1hx4OC',
                roleCode: 'tournament_manager'
            }], {
            transaction
            });
            

            const positions = await db.positions.bulkCreate([{
                code: 'CF',
                name: 'Tiền đạo trung phong',
            }, {
                code: 'SS',
                name: 'Tiền đạo hộ công',
            }, {
                code: 'LW',
                name: 'Tiền đạo cánh trái'
            }, {
                code: 'RW',
                name: 'Tiền đạo cánh phải'
            }, {
                code: 'CM',
                name: 'Tiền vệ trung tâm'
            }, {
                code: 'CAM',
                name: 'Tiền vệ tấn công'
            }, {
                code: 'CDM',
                name: 'Tiền vệ phòng ngự'
            }, {
                code: 'LM',
                name: 'Tiền vệ cánh trái'
            }, {
                code: 'RM',
                name: 'Tiền vệ cánh phải'
            }, {
                code: 'CB',
                name: 'Trung vệ'
            }, {
                code: 'LB',
                name: 'Hậu vệ cánh trái'
            }, {
                code: 'RB',
                name: 'Hậu vệ cánh phải'
            }, {
                code: 'GK',
                name: 'Thủ môn'
            }], {
                transaction
            });

            const teams = await db.teams.bulkCreate([{
                name: 'Manchester United',
                homeShirt: muHome,
                awayShirt: muGuest,
                logo: muLogo
            }, {
                name: 'Chelsea',
                homeShirt: chelHome,
                awayShirt: chelGuest,
                logo: chelLogo
            }, {
                name: 'Manchester City',
                homeShirt: mcHome,
                awayShirt: mcGuest,
                logo: mcLogo
            }], {
                transaction
            });

            const rules = await db.rules.create({
                minAge: 16,
                maxAge: 40,
                minAthletes: 15,
                maxAthletes: 22,
                maxForeignAthletes: 3,
                maxTimeScore: 96
            }, {
                transaction
            });

            const points = await db.points.bulkCreate([{
                code: 'win',
                point: 3
            }, {
                code: 'draw',
                point: 1
            }, {
                code: 'lose',
                point: 0
            }], {
                transaction
            });

            const typescores = await db.typescores.bulkCreate([{
                code: 'A',
                name: 'Bằng chân',
                point: 1
            }, {
                code: 'B',
                name: 'Bằng đầu',
                point: 1
            }, {
                code: 'C',
                name: 'Phản lưới nhà',
                point: -1
            }], {
                transaction
            });

            const stadiums = await db.stadiums.bulkCreate([{
                name: 'Old Trafford',
                hostTeam: teams[0].dataValues.id
            }, {
                name: 'Stamford Bridge',
                hostTeam: teams[1].dataValues.id
            }, {
                name: 'Etihad',
                hostTeam: teams[2].dataValues.id
            }], {
                transaction
            });

            await transaction.commit();

        } catch (error) {
            console.log(error);
            await transaction.rollback();
        }

    }
};