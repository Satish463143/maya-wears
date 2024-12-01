const FileFilterType = {
    IMAGE : 'image',
    VIDEO : 'video',
    DOCUMENT : 'doc',
    AUDIO : 'audio',
    IMAGE_VIDEO: ['image', 'video'],

}
const UserRoles ={
    ADMIN:"admin",
    SELLER:"seller",
    CUSTOMER:"customer",
}

const Status={
    ACTIVE:"active",
    INACTIVE:"inactive"
}
const orderStatus={
    PENDING:"pending",
    SHIPPED:'shipped',
    CANCEL:"canceled",
    DELEVERED:"delevered"
}
const BannerCategory={
    IMAGE:"image",
    VIDEO:"video"
}

const Wearable={
    SUMMER:'Summer',
    WINTER:'Winter',
    BOTH:'Summer and Winter'
}
module.exports ={
    FileFilterType,
    UserRoles,
    Status,
    BannerCategory,
    Wearable,
    orderStatus
}