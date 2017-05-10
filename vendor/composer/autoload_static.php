<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit13149763c9cc1270be9d2428242fe165
{
    public static $prefixLengthsPsr4 = array (
        'N' => 
        array (
            'Noodlehaus\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Noodlehaus\\' => 
        array (
            0 => __DIR__ . '/..' . '/hassankhan/config/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit13149763c9cc1270be9d2428242fe165::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit13149763c9cc1270be9d2428242fe165::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}