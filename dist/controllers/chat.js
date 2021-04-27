"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createPagination = require("./analytics").createPagination;
const mongoose_1 = __importDefault(require("mongoose"));
const Activity = mongoose_1.default.model("Activity");
const Chat = mongoose_1.default.model("Chat");
const User = mongoose_1.default.model("User");
const logger = require("../middlewares/logger");
exports.chat = (req, res, next, id) => {
    Chat.load(id, (err, chat) => {
        if (err) {
            return next(err);
        }
        if (!chat) {
            return next(new Error("Failed to load tweet" + id));
        }
        req.chat = chat;
        next();
    });
};
exports.index = (req, res) => {
    // so basically this is going to be a list of all chats the user had till date.
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const perPage = 10;
    const options = {
        perPage: perPage,
        page: page,
        criteria: { github: { $exists: true } }
    };
    let users, count, pagination;
    User.list(options)
        .then(function (result) {
        users = result;
        return User.countDocuments();
    })
        .then(function (result) {
        count = result;
        pagination = createPagination(req, Math.ceil(result / perPage), page + 1);
        res.render("chat/index", {
            title: "Chat User List",
            users: users,
            page: page + 1,
            pagination: pagination,
            pages: Math.ceil(count / perPage)
        });
    })
        .catch(function (error) {
        return res.render("pages/500", { errors: error.errors });
    });
};
exports.show = (req, res) => {
    res.send(req.chat);
};
exports.getChat = (req, res) => {
    const options = {
        criteria: { receiver: req.params.userid }
    };
    let chats;
    Chat.list(options).then(function (result) {
        chats = result;
        res.render("chat/chat", { chats: chats });
    });
};
exports.create = (req, res) => {
    let user = req.user;
    const chat = new Chat({
        message: req.body.body,
        receiver: req.body.receiver,
        sender: user.id
    });
    logger.info("chat instance", chat);
    chat.save(function (err) {
        const activity = new Activity({
            activityStream: "sent a message to",
            activityKey: chat.id,
            receiver: req.body.receiver,
            sender: user.id
        });
        activity.save(function (err) {
            if (err) {
                logger.error(err);
                res.render("pages/500");
            }
        });
        logger.error(err);
        if (!err) {
            res.redirect(req.header("Referrer"));
        }
    });
};
//# sourceMappingURL=chat.js.map