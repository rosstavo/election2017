<?php

function assc_array_count_values( $array, $key ) {
     foreach( $array as $row ) {
         if ( $row[$key] ) {
             $new_array[] = ucwords( $row[$key] );
         }
     }
     return array_count_values( $new_array );
}

function assc_array_count_values_by_intersect( $array, $key, $other_array ) {
    foreach( $array as $row ) {
         $new_array[] = $row[$key];
    }

    return count( array_intersect( $new_array, $other_array ) );
}

function assc_array_count_values_by_string( $array, $key, $string ) {
    foreach( $array as $row ) {
        if ( $row[$key] === $string ) {
            $new_array[] = $row[$key];
        }
    }

    return count( $new_array );
}

function assc_array_count_matches_by_key( $array, $key1, $key2 ) {
    foreach( $array as $row ) {
        if ( $row[$key1] === $row[$key2] || ! $row[$key2] ) {
            $new_array[] = $row;
        }
    }

    return count( $new_array );
}
