<?php
/**
 * 快速排序法
 *
 */
function quicksort($seq) {
  if (count($seq) > 1) {
    $k = $seq[0];
    $x = array();
    $y = array();
    $_size = count($seq);      //do not use count($seq) in loop for.
    for ($i=1; $i<$_size; $i++) {
      if ($seq[$i] <= $k) {
        $x[] = $seq[$i];
      } else {
        $y[] = $seq[$i];
      }
    }
    $x = quicksort($x);
    $y = quicksort($y);
    return array_merge($x, array($k), $y);
  } else {
    return $seq;
  }
}