const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

const db = require('../models');

module.exports = {
    getTeams: () => {
        const dataTeams = db.teams.findAll({
            include: [
                {
                    model: db.coaches,
                    as: 'team_coach'
                }
            ]
        });
        return dataTeams;
    },

    addTeams: (teamData) => {
        const team = db.teams.create(teamData);
        return team;
    },
    getTeamByID: async (id) => {
        const data = await db.teams.findByPk(id);
        return data;
    },
    updateTeamById: (id, data) => {
        const newData = db.teams.update(data, {
            where: {
                id: id
            }
        });
        console.log(newData);
    },
    statistical: async (id) => {
        const teamData = db.teams.findByPk(id);

        const goals = await sequelize.query(`
        select teams.id, count(matches_scores.id) as count
        from matches_athletes 
            inner join matches_scores on matches_athletes.id = matches_scores.match_athlete
            inner join typescores on matches_scores.type_score = typescores.code
            inner join athletes	on athletes.id = matches_athletes.athlete_id 
            inner join matches on matches_athletes.match_id = matches.id
            inner join teams on athletes.team_id = teams.id
        where typescores.code <> 'C' and teams.id = ?
        group by teams.id
        `, {
            replacements: [id],
            type: QueryTypes.SELECT,
        });

        const totals = await sequelize.query(`
            select count(matches_athletes.id)
            from matches_athletes 
                inner join matches_scores on matches_athletes.id = matches_scores.match_athlete
                inner join typescores on matches_scores.type_score = typescores.code
                inner join athletes	on athletes.id = matches_athletes.athlete_id 
                inner join matches on matches_athletes.match_id = matches.id
                inner join teams on athletes.team_id = teams.id
            where matches.host_team = :id
                or matches.guest_team = :id
            `, {
            replacements: { id: id },
            type: QueryTypes.SELECT
        }
        )

        const wins = await sequelize.query(`
            select matches.id as match, teams.id as team, count (matches_scores.id) as count
            from matches_athletes 
                inner join matches_scores on matches_athletes.id = matches_scores.match_athlete
                inner join typescores on matches_scores.type_score = typescores.code
                inner join athletes	on athletes.id = matches_athletes.athlete_id 
                inner join matches on matches_athletes.match_id = matches.id
                inner join teams on athletes.team_id = teams.id
            where matches.host_team = :id 
                or matches.guest_team = :id
            group by matches.id, teams.id
            `, {
            replacements: { id: id },
            type: QueryTypes.SELECT
        }
        )


        const result = {};
        result.goals = goals[0].count;
        result.fail = totals[0].count - goals[0].count;
        result.win = 0;
        result.lose = 0;
        result.tie = 0;
        const goalTimes = 0, failTimes = 0, winTimes = 0, loseTimes = 0, tieTimes = 0, point = 0;

        for (i = 0; i < wins.length - 1; i++) {
            for (j = i + 1; j < wins.length; j++) {
                if (wins[i].match === wins[j].match) {
                    if (wins[i].count > wins[j].count) {
                        if (wins[i].team === id) {
                            result.win += 1;
                        }
                        else {
                            result.lose += 1;
                        }
                    }
                    else if (wins[i].count = wins[j].count) {
                        result.tie += 1;
                    } else {
                        if (wins[j].team === id) {
                            result.win += 1;
                        }
                        else {
                            result.lose += 1;
                        }
                    }
                }
            }
        }

        for (i = 0; i < wins.length; i++) {
            let num = 0;
            for (j = 0; j < wins.length; j++) {
                if (i != j && wins[i].match === wins[j].match) {
                    i++;
                    num += 1;
                    break;
                }
            }
            if (num == 0) {
                console.log(wins[i]);
                if (wins[i].team === id) {
                    result.win++;
                    console.log("plus");
                } else {
                    result.lose++;
                    console.log("divide");
                }
            }
        }

        const pointSum = await sequelize.query(`
            select teams.id, sum(typescores.point) as sum
            from matches_athletes 
                inner join matches_scores on matches_athletes.id = matches_scores.match_athlete
                inner join typescores on matches_scores.type_score = typescores.code
                inner join athletes	on athletes.id = matches_athletes.athlete_id 
                inner join matches on matches_athletes.match_id = matches.id
                inner join teams on athletes.team_id = teams.id
            where teams.id = :id
            group by teams.id
            `, {
            replacements: { id: id },
            type: QueryTypes.SELECT
        }
        )
        result.point = pointSum[0].sum;

        const listAthlete = await sequelize.query(`
        select athletes.id, athletes.avatar, athletes.full_name, athletes.position_code, count(matches_athletes.id)
        from matches_athletes 
            inner join matches_scores on matches_athletes.id = matches_scores.match_athlete
            inner join typescores on matches_scores.type_score = typescores.code
            inner join athletes	on athletes.id = matches_athletes.athlete_id 
            inner join matches on matches_athletes.match_id = matches.id
            inner join teams on athletes.team_id = teams.id
        where teams.id = :id
        group by athletes.id, athletes.avatar, athletes.full_name, athletes.position_code
        `, {
            replacements: { id: id },
            type: QueryTypes.SELECT
        });
        result.listAthlete = listAthlete;
        return result;
    }
}

